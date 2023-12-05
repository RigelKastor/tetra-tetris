import { checkSession, getAuth, logoutSession, signUp } from './User/action'
import { openTopic, closeTopic } from './Topic/action'

export const GetAuth = getAuth
export const LogoutSession = logoutSession
export const CheckSession = checkSession
export const SignUp = signUp
export const OpenTopic = openTopic
export const CloseTopic = closeTopic
