import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Notifications } from '@mui/icons-material';
import { Phone } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TitleContext } from '../../context/TitleContext';

const BarraSuperior = () => {
  const [menuAberto, setMenuAberto] = useState(false)
  const {title} = useContext(TitleContext)
  const itensMenu = [
    {
        texto: 'Início',
        icone: (<HomeIcon/>),
        to: '/'
    },
    {
        texto: 'Pessoas',
        icone: (<PersonIcon/>),
        to: '/pessoas'
    },
    {
        texto: 'Telefones',
        icone: (<Phone/>),
        to: '/telefones'
    },
    {
        texto: 'Agenda',
        icone: (<CalendarMonthIcon/>),
        to: '/agenda'
    },
    {
        texto: 'Notificações',
        icone: (<Notifications/>),
        to: '/notificacoes'
    },
    {
        texto: 'Configurações',
        icone: (<SettingsIcon/>),
        to: '/settings'
    },
  ]

  return (
    <AppBar position='static'>
        <Toolbar>
            <MenuIcon sx={{ cursor: 'pointer' }} onClick={(e) => setMenuAberto(true)}/>
            <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1, ml: 4}}>
                { title }
            </Typography>
        </Toolbar>
        <Drawer anchor='left' open={menuAberto} onClose={(e) => setMenuAberto(false)}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton edge="start" onClick={(e) => setMenuAberto(false)}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List sx={{width: 250}}>
                { itensMenu.map(itemMenu => (
                    <Link key={itemMenu.texto} to={itemMenu.to} className="menuLink">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{itemMenu.icone}</ListItemIcon>
                                <ListItemText primary={itemMenu.texto}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )) }
            </List>
        </Drawer>
    </AppBar>
  )
}

export default BarraSuperior