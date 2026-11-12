import express from 'express';
import rateLimit from 'express-rate-limit';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import { equalPassword, signSession, verifySession } from './security.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const required = ['DATABASE_URL', 'SITE_ORIGIN', 'ADMIN_ORIGIN', 'SMTP_HOST', 'SMTP_FROM', 'NOTIFY_EMAIL', 'ADMIN_PASSWORD', 'SESSION_SECRET'];
for (const key of required) if (!process.env[key]) throw new Error(`Missing ${key}`);
if (process.env.ADMIN_PASSWORD.length < 32 || process.env.SESSION_SECRET.length < 32) throw new Error('ADMIN_PASSWORD and SESSION_SECRET must each be at least 32 characters');
const siteOrigin = new URL(process.env.SITE_ORIGIN).origin;
const adminOrigin = new URL(process.env.ADMIN_ORIGIN).origin;
if (process.env.NODE_ENV === 'production' && (!siteOrigin.startsWith('https://') || !adminOrigin.startsWith('https://'))) throw new Error('Production origins must use HTTPS');
const db = mysql.createPool(process.env.DATABASE_URL);
await db.execute(`CREATE TABLE IF NOT EXISTS portfolio_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL, email VARCHAR(254) NOT NULL, subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL, mail_status VARCHAR(16) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4`);
const port = Number(process.env.SMTP_PORT || 587);
if (!Number.isInteger(port) || port < 1 || port > 65535 || (process.env.SMTP_USER && !process.env.SMTP_PASS)) throw new Error('Invalid SMTP configuration');
const mail = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } } : {}) });
async function notify(message) {
  await mail.sendMail({ from: process.env.SMTP_FROM, to: process.env.NOTIFY_EMAIL, replyTo: message.email, subject: 'New portfolio enquiry', text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}` });
}
const app = express();
app.disable('x-powered-by');
app.use((req, res, next) => { res.set('X-Content-Type-Options', 'nosniff'); res.set('Referrer-Policy', 'no-referrer'); res.set('Cache-Control', 'no-store'); res.set('Content-Security-Policy', "default-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; style-src 'self'; script-src 'self'"); next(); });
app.use(express.json({ limit: '16kb' }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: 'draft-7', legacyHeaders: false });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false });
const isAuthed = (req) => {
  const raw = (req.headers.cookie || '').split(';').map((s) => s.trim()).find((s) => s.startsWith('inbox_session='))?.slice(14) || '';
  return verifySession(raw, process.env.SESSION_SECRET);
};
const auth = (req, res, next) => isAuthed(req) ? next() : res.status(401).json({ error: 'Sign in required.' });
const sameOrigin = (req, res, next) => req.get('origin') === adminOrigin ? next() : res.status(403).json({ error: 'Invalid origin.' });
app.get('/health', (_req, res) => res.json({ ok: true }));
app.options('/api/messages', (req, res) => { if (req.get('origin') !== siteOrigin) return res.sendStatus(403); res.set('Access-Control-Allow-Origin', siteOrigin); res.set('Vary', 'Origin'); res.set('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.set('Access-Control-Allow-Headers', 'Content-Type'); return res.sendStatus(204); });
app.post('/api/messages', limiter, async (req, res) => {
  if (req.get('origin') !== siteOrigin) return res.sendStatus(403);
  res.set('Access-Control-Allow-Origin', siteOrigin); res.set('Vary', 'Origin');
  const { name, email, subject, message, website } = req.body || {};
  if (website) return res.json({ ok: true });
  if (![name, email, subject, message].every((v) => typeof v === 'string') || !name.trim() || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || /[\r\n]/.test(email) || subject.length > 180 || !message.trim() || message.length > 5000) return res.status(400).json({ error: 'Please check your details.' });
  try {
    const [result] = await db.execute('INSERT INTO portfolio_messages (name,email,subject,message) VALUES (?,?,?,?)', [name.trim(), email.trim(), subject.trim() || 'Portfolio enquiry', message.trim()]);
    try {
      await notify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
      await db.execute('UPDATE portfolio_messages SET mail_status = ? WHERE id = ?', ['sent', result.insertId]);
    } catch (error) { console.error('Notification delivery failed', error.message); }
    return res.status(201).json({ ok: true });
  } catch (error) { console.error('Message storage failed', error.message); return res.status(503).json({ error: 'Message could not be saved.' }); }
});
app.post('/api/login', loginLimiter, sameOrigin, (req, res) => {
  const pass = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!equalPassword(pass, process.env.ADMIN_PASSWORD)) return res.status(401).json({ error: 'Invalid password.' });
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  res.set('Set-Cookie', `inbox_session=${expires}.${signSession(expires, process.env.SESSION_SECRET)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`);
  return res.json({ ok: true });
});
app.post('/api/logout', sameOrigin, (_req, res) => { res.set('Set-Cookie', 'inbox_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'); res.json({ ok: true }); });
app.get('/api/messages', auth, async (_req, res) => { try { const [rows] = await db.execute('SELECT id,name,email,subject,message,mail_status,created_at FROM portfolio_messages ORDER BY id DESC LIMIT 200'); res.json({ messages: rows }); } catch { res.status(503).json({ error: 'Inbox unavailable.' }); } });
app.post('/api/messages/:id/retry', sameOrigin, auth, async (req, res) => {
  if (!/^\d{1,18}$/.test(req.params.id)) return res.sendStatus(400);
  try {
    const [rows] = await db.execute('SELECT id,name,email,subject,message,mail_status FROM portfolio_messages WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.sendStatus(404);
    if (rows[0].mail_status === 'sent') return res.status(409).json({ error: 'Notification already sent.' });
    await notify(rows[0]);
    await db.execute('UPDATE portfolio_messages SET mail_status = ? WHERE id = ?', ['sent', req.params.id]);
    return res.json({ ok: true });
  } catch { return res.status(503).json({ error: 'Notification could not be sent.' }); }
});
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public'), { index: 'index.html' }));
app.listen(Number(process.env.PORT || 3001), '0.0.0.0', () => console.log('Portfolio inbox started'));
