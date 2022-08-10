import { Alert, Box, Button, Container, Divider, TextField } from '@mui/material';

import Logo from '../../assets/logo.png';
import Background from '../../assets/background.jpg';
import { useContext, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';

function Login() {
  const [usuario, setUsuario] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { setLoading } = useContext(LoadingContext)

  const handleSubmit = () => {
    setError("")
    if (!usuario || !password) {
      setError("Usuário e senha obrigatórios")
      return
    }

    setLoading(true)
    api.post('/login', {
      email: usuario,
      password: password
    }).then(({data}) => {
      if (data.success === true) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('loggedIn', true)
        navigate('/')
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        setError('Usuário ou Senha inválidos')
        return 
      }
      setError('Não foi possível realizar o login')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <Loading/>
      <Box sx={{height: '100vh', backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
        <Container maxWidth="xs" sx={{pt: 10}}>
          <Box sx={{display: 'flex', flexDirection: 'column', boxShadow: 4, pb: 4, backgroundColor: 'white'}}>
            <Box sx={{maxWidth: '80%', width: '300px', margin: '0 auto', mt: 5}}>
              <img src={ Logo } alt="" style={{width: '100%'}} loading="lazy"/>
            </Box>
            <Divider sx={{mt: 2, mb: 2}}>
              Informe seu <strong>Usuário</strong> e <strong>Senha</strong>
            </Divider>
            <Box sx={{width: '90%', display: 'flex', flexDirection: 'column', margin: '0 auto', mt: 3}}>
              {error && (<Alert severity="error" sx={{mb: 2}}>{error}</Alert>)}
              <TextField label='Usuário' fullWidth variant='standard' onChange={(e) => setUsuario(e.target.value)}/>
              <TextField label='Senha' fullWidth sx={{ mt: 3 }} variant='standard' type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Box>
            <Box sx={{ mt: 5, mx: 'auto' }}>
              <Button variant='contained' onClick={handleSubmit}>Entrar</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Login;
