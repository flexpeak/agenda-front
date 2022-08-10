import { Backdrop, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { LoadingContext } from '../../context/LoadingContext'

const Loading = () => {
  const { loading } = useContext(LoadingContext)
  return (
    <Backdrop open={loading} sx={{zIndex: 1}}>
        <CircularProgress/>
    </Backdrop>
  )
}

export default Loading