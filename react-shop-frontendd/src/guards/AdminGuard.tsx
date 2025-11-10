import React, { type ReactNode } from 'react'
import {jwtDecode} from 'jwt-decode'
import { Navigate } from 'react-router-dom'

import type { User } from '../contexts/auth/types';
import { local } from '../App'
import { tokenKey } from '../env'

type Props = {
  children: ReactNode
}

const RouteGuard: React.FC<Props> = ({ children }) => {
  const token = local.getItem(tokenKey)

  if (!token) {
    return <Navigate to="/profile" replace />
  }

  const user: User = jwtDecode(token);

  if (user.role !== 'Admin') {
    return <Navigate to="/profile" replace />
  }

  return <>{children}</>
}

export default RouteGuard
