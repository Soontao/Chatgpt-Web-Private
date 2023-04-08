import process from 'process'
import { isNotEmptyString } from './is'

export const KEY_LIST = []

if (isNotEmptyString(process.env.AUTH_SECRET_KEY))
  KEY_LIST.push(process.env.AUTH_SECRET_KEY.trim())

if (isNotEmptyString(process.env.JSON_AUTH_SECRET_KEY))
  KEY_LIST.push(...JSON.parse(process.env.JSON_AUTH_SECRET_KEY))

export const hasAuth = KEY_LIST.length > 0
