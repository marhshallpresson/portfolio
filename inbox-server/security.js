import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
export function equalPassword(actual, expected) {
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(actual), digest(expected));
}
export function signSession(expires, secret) {
  return createHmac('sha256', secret).update(expires).digest('hex');
}
export function verifySession(raw, secret, now = Date.now()) {
  const [expires, sig, extra] = raw.split('.');
  if (extra !== undefined || !/^\d{13}$/.test(expires || '') || !/^[a-f0-9]{64}$/.test(sig || '') || Number(expires) <= now) return false;
  return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(signSession(expires, secret), 'hex'));
}
