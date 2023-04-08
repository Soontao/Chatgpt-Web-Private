import type { RequestHandler } from 'express'
import { KEY_LIST, hasAuth } from 'src/utils/key'

const auth: RequestHandler = async (req, res, next) => {
  if (hasAuth) {
    try {
      const Authorization = req.header('Authorization')
      if (!Authorization || !KEY_LIST.includes(Authorization.substring('Bearer '.length).trim()))
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth }
