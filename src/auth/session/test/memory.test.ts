import '../../../test/test_helper';

import {Session} from '../session';
import {MemorySessionStorage} from '../storage/memory';

test("can store and delete sessions in memory", async () => {
  const sessionId = 'test_session';
  const storage = new MemorySessionStorage();
  const session = new Session(sessionId, (new Date()).getTime() + 86400000);

  await expect(storage.storeSession(session)).resolves.toBe(true);
  await expect(storage.loadSession(sessionId)).resolves.toEqual(session);

  await expect(storage.storeSession(session)).resolves.toBe(true);
  await expect(storage.loadSession(sessionId)).resolves.toEqual(session);

  await expect(storage.deleteSession(sessionId)).resolves.toBe(true);
  await expect(storage.loadSession(sessionId)).resolves.toBeNull();

  // Deleting a non-existing session should work
  await expect(storage.deleteSession(sessionId)).resolves.toBe(true);
});

test("wrong ids return null sessions from memory", async () => {
  const storage = new MemorySessionStorage();
  await expect(storage.loadSession('not_a_session_id')).resolves.toBeNull();
});
