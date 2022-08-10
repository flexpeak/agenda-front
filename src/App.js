import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PessoasForm from './pages/pessoas/PessoasForm';
import PessoasIndex from './pages/pessoas/PessoasIndex';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/pessoas" element={<PessoasIndex/>}/>
        <Route path="/pessoas/:id" element={<PessoasForm/>}/>
        <Route path="/pessoas/create" element={<PessoasForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App