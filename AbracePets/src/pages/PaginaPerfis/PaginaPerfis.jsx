// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import style from './PaginaPerfis.module.css';
import Sobre from '../../components/Sobre';
import Cards from '../../components/Cards';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import PetsDesaparecido from '../../components/PetsDesaparecidos';
import BarraDePesquisa from '../../components/BarraDePesquisa';
import Configuracoes from '../../components/Configuracoes';

// eslint-disable-next-line react/prop-types
function PaginaPerfis({ userId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem('token');
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarSobre, setMostrarSobre] = useState(false);
  const [mostrarCards, setMostrarCards] = useState(false);
  const [mostrarLinkAdmin, setMostrarLinkAdmin] = useState(false);
  const [mostrarConfigurações, setMostrarConfigurações] = useState(false);
  const [mostrarCadastroPetsDesaparecido, setMostrarCadastroPetsDesaparecido] = useState(false);
  const navigate = useNavigate();
  const mudarCorDeFundo = (novaCor) => {
    document.body.style.backgroundColor = novaCor;
    document.documentElement.style.backgroundColor = novaCor;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    window.location.reload();
  };

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setMenuAberto(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  
    const fetchCurrentUser = async () => {
      try {
        // eslint-disable-next-line no-undef
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.UsuarioId;
  
        const response = await axios.get(`https://abracepets-api.tccnapratica.com.br/usuario/${userId}`, {
          headers: {
            // eslint-disable-next-line no-undef
            Authorization: `Bearer ${token}`,
          },
        })
        const currentUser = response.data;
        console.log(currentUser);
  
        // Verifica se o usuário é um administrador
        if (currentUser.isAdmin === true || currentUser.isAdmin === 1) {
          // Se for administrador, exibe o link "Administrador"
          // eslint-disable-next-line no-undef
          setMostrarLinkAdmin(true);
        }
  
      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
      }
    };
  
    fetchCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  }, [token, navigate]);

  useEffect(() => {
    setMostrarCards(true);
  }, []);

  return (
    <div className={style.layoutContainer}>
      {/* Componente do header */}
      <header className={style.header}>
        <div className={menuAberto ? style.menuAberto : style.menuFechado}>
          <Link to="/home" className={style.button}>Conheça os Pets</Link>
          <Link to="/login" className={style.button}>Login Usuario</Link>
          <Link to="/cadastro/usuario" className={style.button}>Cadastro Usuario</Link>
          <Link to="/cadastro/pet" className={style.button}>Cadastro Pet</Link>
          <Link to="/administrador" className={style.button} style={{ display: mostrarLinkAdmin ? 'block' : 'none' }}>
            Administrador
            <img src='../src/assets/icons/cadeado.svg' className={style.cadeado_perfis}></img>
            </Link>
        </div>
        <button className={style.menuBotao} onClick={alternarMenu}>
          <img className={style.menuImagem} src={"../src/assets/icons/menu.svg"} alt="Menu" />
        </button>
        <Link to={"/"}>
          <img src={"../src/assets/LogotipoAbracePetsSVG.png"} className={style.logoAbracePets_home} alt="Logo" />
        </Link>
        {sessionStorage.getItem('token', 'userId') ? (
          <button className={style.botao_sair} onClick={handleLogout}>
            Sair
          </button>
        ) : (
          <Link to="/login" className={style.botao_entrar}>
            Entrar
          </Link>
        )}
      </header>
      <BarraDePesquisa searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className={style.contentContainer}>
        <aside className={style.sidebar}>
          <nav className={style.footer}>
            <Link to="/home" className={style.link_footer} onClick={() => { setMostrarSobre(false); setMostrarCards(true); setMostrarCadastroPetsDesaparecido(false); setMostrarConfigurações(false);}}>
              <div className={style.menu_inferior}>
                <div>
                  <img src={"../src/assets/icons/home.svg"} className={style.ajustar_tamanho_icones} alt={"Home"}></img>
                </div>
                <label>Home</label>
              </div>
            </Link>
            <Link className={style.link_footer} onClick={() => { setMostrarSobre(false); setMostrarCards(false); setMostrarCadastroPetsDesaparecido(true); setMostrarConfigurações(false);}}>
              <div className={style.menu_inferior}>
                <div>
                  <img src={"../src/assets/icons/alerta.svg"} className={style.ajustar_tamanho_icones} alt={"Alerta"}></img>
                </div>
                <label>Alerta</label>
              </div>
            </Link>
            <Link to={"/cadastro/pet"} className={style.link_footer}>
              <div className={style.menu_inferior}>
                <div>
                  <img src={"../src/assets/icons/add.svg"} className={style.ajustar_tamanho_icones}></img>
                </div>
                <label>Add</label>
              </div>
            </Link>
            <Link onClick={() => { setMostrarSobre(true); setMostrarCards(false); setMostrarCadastroPetsDesaparecido(false);  setMostrarConfigurações(false); }} className={style.link_footer}>
              <div className={style.menu_inferior}>
                <div>
                  <img src={"../src/assets/icons/info.svg"} className={style.ajustar_tamanho_icones}></img>
                </div>
                <label>Info</label>
              </div>
            </Link>
            <Link onClick={() => { setMostrarSobre(false); setMostrarCards(false); setMostrarCadastroPetsDesaparecido(false); setMostrarConfigurações(true);}} className={style.link_footer}>
              <div className={style.menu_inferior}>
                <div>
                  <img src={"../src/assets/icons/config.svg"} className={style.ajustar_tamanho_icones}></img>
                </div>
                <label>Config</label>
              </div>
            </Link>
          </nav>
        </aside>

        <main className={style.conteudo_main}>
          {mostrarCards && <Cards searchTerm={searchTerm} />}
          {mostrarSobre && <Sobre />}
          {mostrarConfigurações && <Configuracoes />}
          {mostrarCadastroPetsDesaparecido && <PetsDesaparecido searchTerm={searchTerm} userId={userId} />}
        </main>
      </div>

        <div className={style.conteudo_footer}>
          <div id={style.copyright_footer}>
            © Copyright - Todos os direitos Reservados - AbracePets
          </div>
          <a className={style.logo_abracepets_footer} href="#">
            <img src={"../src/assets/LogotipoAbracePetsSVG.png"} className={style.logotipoabracepetssvg}></img>
          </a>
        </div>
    </div>
  );
}

export default PaginaPerfis;
