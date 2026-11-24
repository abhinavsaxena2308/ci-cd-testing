import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 8080

app.get('/', (req, res) => {
    return res.json({ msg: 'Hello from the server v8' })
})

export default app

if (import.meta.main) {
    app.listen(PORT, () => {
        console.log(`Server is up and running on PORT ${PORT}`)
    })
}