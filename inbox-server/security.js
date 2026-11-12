import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
export function equalPassword(actual, expected) {
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(actual), digest(expected));
}
export function sessionTokenHash(token, secret) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return createHmac('sha256', secret).update(token).digest('hex');
}
