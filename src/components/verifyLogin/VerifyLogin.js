import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VerifyLogin = ({children}) => {
  const [loggedIn] = useState(localStorage.getItem('loggedIn'))
  const navigate = useNavigate()
  useEffect(() => {
    if (!loggedIn) {
        navigate('/login')
    }
  }, [loggedIn, navigate])

  return (
    <>
        {children}
    </>
  )
}

export default VerifyLogin