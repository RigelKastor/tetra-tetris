import { UserType } from '@/components/types'

export type SessionState = {
  session: boolean
  user?: UserType | null
  theme?: 'light' | 'dark'
}
