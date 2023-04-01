import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://res.cloudinary.com/drxgh9gqs/image/upload/v1680351989/https___s3.amazonaws.com_appforest_uf_f1626231075038x198861132171598940_openai-1523664-1290202_rojxzg.png',
      name: 'OpenAI',
      description: 'Star on <a href="https://github.com/Soontao/Chatgpt-Web-Private" class="text-blue-500" target="_blank" >Github</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
