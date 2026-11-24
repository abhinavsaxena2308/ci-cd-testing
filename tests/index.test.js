
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('GET / returns a valid response', async () => {
    const response = await fetch('http://localhost:8080');

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(typeof data.msg, 'string');
    assert.ok(data.msg.length > 0);
});
