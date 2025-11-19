import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth/AuthContext'
import { validateToken } from '../utils/tokenUtils'
import { local } from '../App'
import { tokenKey } from '../env'

type Props = {
  children: ReactNode
}

const AdminGuard: React.FC<Props> = ({ children }) => {
  const { user, isUserExist } = useAuth()
  const token = local.getItem(tokenKey)

  if (!token || !validateToken(token)) {
    return <Navigate to="/profile" replace />
  }

  if (!isUserExist || user.role !== 'Admin') {
    return <Navigate to="/profile" replace />
  }

  return <>{children}</>
}

export default AdminGuard
