import { Alert, Button, Divider, Paper, TextField } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import BarraSuperior from '../../components/barraSuperior/BarraSuperior'
import Loading from '../../components/loading/Loading'
import VerifyLogin from '../../components/verifyLogin/VerifyLogin'
import { TitleContext } from '../../context/TitleContext'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { LoadingContext } from '../../context/LoadingContext'
import { useNavigate } from 'react-router-dom'

const PessoasForm = () => {
  const { setTitle } = useContext(TitleContext)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [data_nascimento, setDataNascimento] = useState('')
  const [salario, setSalario] = useState('')
  const { id } = useParams()
  const { setLoading } = useContext(LoadingContext)
  const [sucesso, setSucesso] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTitle('Formulário de Pessoas')
  }, [setTitle])

  useEffect(() => {
    if (id) {
        setLoading(true)
        api.get('/api/pessoas/' + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(({data}) => {
            setNome(data.nome)
            setEmail(data.email)
            setDataNascimento(data.data_nascimento.split('/').reverse().join('-'))
            setSalario(data.salario)
        }).finally(() => {
            setLoading(false)
        })
    }
  }, [id, setLoading])

  const handleSubmit = () => {
    if (id) {
        setSucesso(false)
        setLoading(true)
        api.put('/api/pessoas/' + id, {
            nome: nome,
            email: email,
            data_nascimento: data_nascimento,
            salario: salario.replace(".", ",")
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(({data}) => {
            setSucesso(true)
        }).finally(() => {
            setLoading(false)
        })
    } else {
        setSucesso(false)
        setLoading(true)
        api.post('/api/pessoas', {
            nome: nome,
            email: email,
            data_nascimento: data_nascimento,
            salario: salario.replace(".", ",")
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(({data}) => {
            setSucesso(true)
            navigate('/pessoas/' + data.id)
        }).finally(() => {
            setLoading(false)
        })
    }
  }

  return (
    <VerifyLogin>
        <BarraSuperior/>
        <Loading/>
        <Container maxWidth="md">
            <Box sx={{ p: 5, pb: 6, mt: 5, display: 'flex', flexDirection: 'column'}} component={Paper}>
                <Divider sx={{color: 'gray', mt: 1, mb: 3}}><small>Digite as Informações no Formulário Abaixo</small></Divider>
                {sucesso && (<Alert severity="success" sx={{mb: 4}}>Registro Salvo com Sucesso!</Alert>)}
                <TextField focused sx={{mb: 2}} label="Nome" variant='standard' fullWidth autoFocus onChange={(e) => setNome(e.target.value)} value={nome}/>
                <TextField focused type="email" sx={{mb: 2}} label="Email" variant='standard' fullWidth onChange={(e) => setEmail(e.target.value)} value={email}/>
                <TextField focused type="date" sx={{mb: 2}} label="Data de Nascimento" variant='standard' fullWidth onChange={(e) => setDataNascimento(e.target.value)} value={data_nascimento}/>
                <TextField focused type="number" sx={{mb: 2}} label="Salário" variant='standard' fullWidth onChange={(e) => setSalario(e.target.value)} value={salario}/>
                <Button variant='contained' sx={{mt: 5}} onClick={handleSubmit}>Salvar</Button>
            </Box>
        </Container>
    </VerifyLogin>
  )
}

export default PessoasForm