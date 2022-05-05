import express from 'express'

const app = express();

app.get('/users', (req, res) => {
  return res.send('vine')
})

app.listen(3333, () => {
  console.log('HTTP server running')
})