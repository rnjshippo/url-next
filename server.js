import express from 'express'
import next from 'next'

const port = parseInt(process.env.PORT, 10) || 80
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  //all 앞에 route 작성하면 nextjs api route보다 먼저 수행
  /*
  server.get('/api/test', (req, res) => {
    res.json({ "test": "test" })
  })
  */

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})