// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useParams, Link } from 'react-router-dom';
import Carregamento from '../components/Carregamento';
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line no-unused-vars
import BotaoVoltarTopo from './BotaoVoltarTopo'
import style from '../components/Configuracoes.module.css'
import InformacoesUsuario from '../components/InformacoesUsuario';
import InformacoesPets from '../components/InformacoesPets';
import AlterarSenha from '../components/AlterarSenha';

const Configuracoes = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [componenteSelecionado, setComponenteSelecionado] = useState(null);
  const [titulo, setTitulo] = useState('Configurações');
  // eslint-disable-next-line no-unused-vars
  const [petsUsuario, setPetsUsuario] = useState([]);

  // Token obtido
  const token = sessionStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      // Decodificando o token para obter o userId
      const decodedToken = jwtDecode(token);
      userId = decodedToken.UsuarioId; // ou qualquer outro nome que você tenha usado no payload do token
    } catch (err) {
      setError('Erro ao decodificar o token');
      setLoading(false);
    }
  }

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://abracepets-api.tccnapratica.com.br/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await fetch('https://abracepets-api.tccnapratica.com.br/pet/listar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar pets');
      }

      const petData = await response.json();
      setPets(petData);
      setPetsUsuario(petData.filter(pet => pet.UsuarioId === userId));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Você precisa estar logado para ver esta página.');
      setLoading(false);
      return;
    }

    fetchUser();
    fetchPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  const handleSelecionarComponente = (componente, novoTitulo) => {
    setComponenteSelecionado(componente);
    setTitulo(novoTitulo);
  };

  const handleVoltar = () => {
    setComponenteSelecionado(null);
    setTitulo('Configurações');
  };

  const tentarNovamente = () => {
    setLoading(true);
    setError(null);
    fetchUser();
    fetchPets();
  };

  let componenteRenderizado;
  switch (componenteSelecionado) {
    case 'InformacoesUsuario':
      componenteRenderizado = <InformacoesUsuario />;
      break;
    case 'InformacoesPets':
      componenteRenderizado = <InformacoesPets pets={petsUsuario} />;
      break;
    case 'AlterarSenha':
      componenteRenderizado = <AlterarSenha />;
      break;
    default:
      componenteRenderizado = (
        <div className={style.div_config_info}>
          <button className={style.opcoes_config} onClick={() => handleSelecionarComponente('InformacoesUsuario', 'Informações Usuário')}>
            <label>Informações Usuario</label>
          </button>
          <button className={style.opcoes_config} onClick={() => handleSelecionarComponente('InformacoesPets', 'Informações Pets')}>
            <label>Informações Pets</label>
          </button>
          <button className={style.opcoes_config} onClick={() => handleSelecionarComponente('AlterarSenha', 'Alterar Senha')}>
            <label>Alterar Senha</label>
          </button>
        </div>
      );
  }

  if (!token) {
    return (
      <div>
        <p className={style.error_cards}>Você precisa estar logado para ver esta página.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className={style.error_cards}>Erro ao carregar os dados: {error}</p>
        <button onClick={tentarNovamente} className={style.botao_error}>
          Tentar Novamente
          <img className={style.icone_reload} src="../src/assets/icons/reload.svg" alt="Recarregar" />
        </button>
      </div>
    );
  }

  if (loading) {
    return <Carregamento />;
  }

  return (
    <>
      <div className={style.label_configuracoes}>
        <div className={style.label_profile}>

          {componenteSelecionado && (
            <button className={style.icone_voltar} onClick={handleVoltar}>
              <img src={"../src/assets/icons/voltar.svg"} className={style.imagem_voltar} alt="Voltar" />
            </button>
          )}
          <div className={style.titulo_config}>
            {titulo}
          </div>
        </div>
      </div>
      {componenteRenderizado}
    </>
  );  
};

export default Configuracoes;