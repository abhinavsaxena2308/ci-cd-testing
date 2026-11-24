
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

test('GET / returns a valid response', async () => {
    const server = spawn('node', ['index.js'], {
        env: { ...process.env, PORT: '8080' },
        stdio: 'ignore'
    });

    try {
        let response;

        for (let i = 0; i < 20; i++) {
            try {
                response = await fetch('http://127.0.0.1:8080');
                break;
            } catch {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        assert.ok(response, 'Server is not running');
        assert.equal(response.status, 200);

        const data = await response.json();

        assert.equal(typeof data.msg, 'string');
        assert.ok(data.msg.length > 0);

    } finally {
        server.kill();
    }
});
