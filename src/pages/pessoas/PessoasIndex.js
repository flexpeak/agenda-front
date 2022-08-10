import { Button, Container, Fab, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import BarraSuperior from '../../components/barraSuperior/BarraSuperior'
import Loading from '../../components/loading/Loading'
import AddIcon from '@mui/icons-material/Add';
import VerifyLogin from '../../components/verifyLogin/VerifyLogin'
import { LoadingContext } from '../../context/LoadingContext'
import { TitleContext } from '../../context/TitleContext'
import api from '../../services/api'
import { Link } from 'react-router-dom'

const PessoasIndex = () => {
  const { setTitle } = useContext(TitleContext)
  const [ pessoas, setPessoas ] = useState([])
  const { setLoading } = useContext(LoadingContext)
  const [ reload, setReload ] = useState(false)

  useEffect(() => {
    setTitle('Listagem de Pessoas')
  }, [setTitle])

  useEffect(() => {
    setLoading(true)
    api.get('/api/pessoas', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(({data}) => {
        setPessoas(data.data)
    }).finally(() => {
        setLoading(false)
    })
  }, [setPessoas, setLoading, reload])

  const excluirPessoa = (pessoaId) => {
    if (window.confirm("Tem certeza que deseja excluir esse registro?")) {
        setLoading(true)
        api.delete('/api/pessoas/' + pessoaId, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(({data}) => {
            alert('Registro excluído com sucesso!')
        }).finally(() => {
            setLoading(false)
            setReload(true)
        })
    }
  }

  return (
    <VerifyLogin>
        <BarraSuperior/>
        <Loading/>
        <Container maxWidth="xl">
            <Box sx={{ p: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table size="sm">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ações</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Data de Nascimento</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Salário</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pessoas.length ? pessoas.map((pessoa) => (
                                        <TableRow key={pessoa.id}>
                                            <TableCell>
                                                <Link to={"/pessoas/" + pessoa.id} className="menuLink">
                                                    <Button variant='contained' size="small">Editar</Button>
                                                </Link>
                                                <Button variant='contained' size="small" sx={{ ml:1}} color="error" onClick={() => excluirPessoa(pessoa.id)}>Excluir</Button>
                                            </TableCell>
                                            <TableCell>{ pessoa.nome }</TableCell>
                                            <TableCell>{ pessoa.data_nascimento }</TableCell>
                                            <TableCell>{ pessoa.email }</TableCell>
                                            <TableCell>{ pessoa.salario }</TableCell>
                                        </TableRow>
                                    )) : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            <Link to='/pessoas/create'>
                <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 40, right: 40}}>
                    <AddIcon />
                </Fab>
            </Link>
        </Container>
    </VerifyLogin>
  )
}

export default PessoasIndex