export type PageTypes = 'profile' | 'leaderboard' | 'game' | 'forum' | 'default'
export type UserType = {
  id: number
  display_name: null | string
  first_name: string | null
  second_name: string | null
  login: string
  email: string
  phone: string | null
  avatar: string | null
}

export type PositionType = 'first' | 'second' | 'third'

export type LeaderUserType = {
  userId: number
  avatar?: string | null
  display_name: string | null
  score: number
}

export type GameType = {
  score: number
}

export type TopicType = {
  id: number
  uid: number
  theme: string
  body: string
}
