import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import BarraSuperior from '../../components/barraSuperior/BarraSuperior'
import VerifyLogin from '../../components/verifyLogin/VerifyLogin'
import { TitleContext } from '../../context/TitleContext'
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Notifications } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Home = () => {
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

  const kpis = [
    {
      texto: 'Pessoas Cadastradas',
      numero: 149,
      icone: (<PersonIcon sx={{ width: '100%' , height: '100%'}}/>),
      color: '#1565c0'
    },
    {
      texto: 'Compromissos Agendados',
      numero: 13,
      icone: (<CalendarMonthIcon sx={{ width: '100%', height: '100%'}} />),
      color: '#7b1fa2'
    },
    {
      texto: 'Novas Notificações',
      numero: 3,
      icone: (<Notifications sx={{ width: '100%', height: '100%'}} />),
      color: '#c62828'
    },
    {
      texto: 'Usuários Cadastrados',
      numero: 10,
      icone: (<ManageAccountsIcon sx={{ width: '100%', height: '100%'}} />),
      color: '#e65100'
    }
  ]

  return (
    <VerifyLogin>
      <BarraSuperior/>
      <Box sx={{ p: 3}}>
        <Grid container spacing={2}>
          {kpis.map((kpi) => (
            <Grid item md={3} xs={12}>
              <Paper sx={{display: 'flex', p: 3}}>
                <Avatar sx={{width: 60, height: 60, bgcolor: kpi.color}}>
                  <Box sx={{width: 40, height: 40}}>
                    { kpi.icone }
                  </Box>
                </Avatar>
                <Box sx={{pl: 2}}>
                  <Typography sx={{width: '100%', fontWeight: 'bold'}} variant="h5">{ kpi.numero }</Typography>
                  <Typography>{ kpi.texto }</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </VerifyLogin>
  )
}

export default Home