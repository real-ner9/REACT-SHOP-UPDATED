import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledButton } from './StyledButtons'

const AuthButton = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <StyledButton onClick={() => navigate('/register')}>Сначала зарегистрируйтесь</StyledButton>
    </div>
  )
}

export default AuthButton
