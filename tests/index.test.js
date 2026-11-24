import assert from 'node:assert/strict'
import { test } from 'node:test'
import app from '../index.js'

test('GET / returns the greeting', async (t) => {
    const server = app.listen(0)
    await new Promise((resolve) => server.once('listening', resolve))

    t.after(() => new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve())
    }))

    const address = server.address()
    assert.ok(address && typeof address === 'object')

    const response = await fetch(`http://127.0.0.1:${address.port}/`)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { msg: 'Hello from the server v6' })
})
