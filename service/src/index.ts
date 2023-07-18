import express from 'express'
import main_router from './main_router'

const app = express()

app.set('trust proxy', 1)

if (process.env.X_AUTH_KEY) {
  app.use(function _basic_auth(req, res, next) {
    if (req.headers['x-auth'] !== process.env.X_AUTH_KEY)
      return res.status(401).json({ message: 'x-auth unauthorized' })

    next()
  })
}

app.use(express.static('public'))
app.use(express.json())

app.all('*', function _cors(_, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use('', main_router)
app.use('/api', main_router)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
