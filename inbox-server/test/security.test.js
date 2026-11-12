import test from 'node:test';
import assert from 'node:assert/strict';
import { equalPassword, sessionTokenHash } from '../security.js';

test('admin password must match exactly', () => {
  assert.equal(equalPassword('a secure password', 'a secure password'), true);
  assert.equal(equalPassword('a secure password ', 'a secure password'), false);
});
test('session tokens are strictly validated and keyed before storage', () => {
  const token = 'a'.repeat(64);
  assert.match(sessionTokenHash(token, 'test secret'), /^[a-f0-9]{64}$/);
  assert.notEqual(sessionTokenHash(token, 'test secret'), sessionTokenHash(token, 'other secret'));
  assert.notEqual(sessionTokenHash(token, 'test secret'), token);
  assert.equal(sessionTokenHash('bad', 'test secret'), null);
  assert.equal(sessionTokenHash(`${token}.extra`, 'test secret'), null);
});
