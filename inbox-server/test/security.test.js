import test from 'node:test';
import assert from 'node:assert/strict';
import { equalPassword, signSession, verifySession } from '../security.js';

test('admin password must match exactly', () => {
  assert.equal(equalPassword('a secure password', 'a secure password'), true);
  assert.equal(equalPassword('a secure password ', 'a secure password'), false);
});
test('session requires a valid signature and future expiry', () => {
  const secret = 'test secret'; const expires = '2000000000000';
  const token = `${expires}.${signSession(expires, secret)}`;
  assert.equal(verifySession(token, secret, 1900000000000), true);
  assert.equal(verifySession(token, 'other secret', 1900000000000), false);
  assert.equal(verifySession(token, secret, 2000000000000), false);
  assert.equal(verifySession(`2000000000001.${token.split('.')[1]}`, secret, 1900000000000), false);
  assert.equal(verifySession(`${token}.extra`, secret, 1900000000000), false);
});
