// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider } from './context/UserContext';

import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaPerfis from './pages/PaginaPerfis/PaginaPerfis';
import Sobre from './components/Sobre';
import Cadastro from './components/CadastroUsuario';
import LoginUsuario from './components/LoginUsuario';
import CadastroPets from '../src/components/CadastroPets';
import Administrador from '../src/components/Administrador'
import PerfilPet from '../src/components/PerfilPet';
import PetsDesaparecido from './components/PetsDesaparecidos';
import Configuracoes from './components/Configuracoes';
import CadastroPetDesaparecido from '../src/components/CadastroPetDesaparecido/CadastroPetsDesaparecimento';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const estaLogado = () => !!token;
  
  return (
    <>
      <UserProvider>
        <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/home" element={<PaginaPerfis userId={id} />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route 
            path="/login" 
            element={estaLogado() ? 
              <Navigate to="/home" replace /> : 
              <LoginUsuario setToken={setToken} setId={setId}/>} 
          />
          <Route 
            path="/cadastro/usuario" 
            element={estaLogado() ? 
              <Navigate to="/home" replace /> : 
              <Cadastro />} 
          />
          <Route 
            path="/cadastro/pet" 
            element={estaLogado() ? 
              <CadastroPets /> : 
              <Navigate to="/login" replace />} 
          />
          <Route path="/perfil/:id" element={<PerfilPet />} />
          <Route 
            path="/administrador" 
            element={ 
              <Administrador/>} 
          />
          <Route path="/cadastrar-desaparecimento/:id" element={<CadastroPetDesaparecido />} />
          <Route 
            element={<PetsDesaparecido userId={id} />} // Passando userId como prop para CadastroPetsDesaparecido
          />
          <Route path="/configurações" element={<Configuracoes />} />
        </Routes>
        </Router>
      </UserProvider>
      </>
  );
}

export default App;
