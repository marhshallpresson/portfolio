const login = document.querySelector('#login');
const inbox = document.querySelector('#inbox');
const notice = document.querySelector('#notice');
const logout = document.querySelector('#logout');
async function refresh() {
  notice.textContent = '';
  try {
    const res = await fetch('/api/messages');
    if (res.status === 401) { login.hidden = false; inbox.hidden = true; logout.hidden = true; return; }
    if (!res.ok) throw new Error('Could not load the inbox.');
    const { messages } = await res.json();
    login.hidden = true; inbox.hidden = false; logout.hidden = false;
    const list = document.querySelector('#messages'); list.replaceChildren();
    if (!messages.length) { list.textContent = 'No messages yet.'; return; }
    for (const m of messages) {
      const article = document.createElement('article'); article.className = 'message';
      const title = document.createElement('h3'); title.textContent = m.subject;
      const meta = document.createElement('p'); meta.className = 'meta'; meta.textContent = `${m.name} · ${m.email} · ${new Date(m.created_at).toLocaleString()} · Email notification: ${m.mail_status}`;
      const body = document.createElement('p'); body.className = 'body'; body.textContent = m.message;
      const reply = document.createElement('a'); reply.href = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`; reply.textContent = 'Reply by email';
      article.append(title, meta, body, reply); list.append(article);
      if (m.mail_status !== 'sent') { const retry = document.createElement('button'); retry.textContent = 'Retry email notification'; retry.addEventListener('click', async () => { retry.disabled = true; try { const r = await fetch(`/api/messages/${encodeURIComponent(m.id)}/retry`, { method: 'POST' }); if (!r.ok) throw new Error(); await refresh(); } catch { notice.textContent = 'Could not send the notification. Check your email settings.'; retry.disabled = false; } }); article.append(' ', retry); }
    }
  } catch { notice.textContent = 'Could not load the inbox. Please try again.'; }
}
document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); notice.textContent = '';
  try { const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: document.querySelector('#password').value }) }); if (!res.ok) throw new Error(); document.querySelector('#password').value = ''; await refresh(); } catch { notice.textContent = 'Sign-in failed. Check your password and try again.'; }
});
document.querySelector('#refresh').addEventListener('click', refresh);
logout.addEventListener('click', async () => { await fetch('/api/logout', { method: 'POST' }); await refresh(); });
refresh();
