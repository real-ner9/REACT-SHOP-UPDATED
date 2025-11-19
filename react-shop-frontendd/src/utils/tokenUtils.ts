import { jwtDecode } from 'jwt-decode'
import type { User } from '../contexts/auth/types'

export interface DecodedToken {
  id: number
  email: string
  role: 'User' | 'Admin'
  exp: number
  iat: number
}

export const decodeToken = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    throw new Error('Invalid token format')
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

export const getTokenUser = (token: string): User => {
  const decoded = decodeToken(token)
  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    name: undefined,
    lastLoginAt: null,
    isEmailConfirmed: false,
    cart: [],
    favorite: [],
  }
}

export const validateToken = (token: string | null): boolean => {
  if (!token) {
    return false
  }

  try {
    return !isTokenExpired(token)
  } catch {
    return false
  }
}

