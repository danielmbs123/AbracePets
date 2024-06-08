/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from '../PaginaInicial/PaginaInicial.module.css'
import logo from '../../assets/LogotipoAbracePetsSVG.png'
import BotaoTopo from '../../components/BotaoVoltarTopo';
import Sobre from '../../components/Sobre'

function PaginaInicial() {
    const [menuAberto, setMenuAberto] = useState(false);

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

  return (
  <>
    <div className={style.background_cachorro}>
        <div className={style.header}>
            <img src={logo} className={`${style.logo} ${style.kaushan_font}`}></img>
            <div className={menuAberto ? style.menuAberto : style.setmenuFechado}>
            <Link to="/home" className={style.button}>Conheça os Pets</Link>
            <Link to="/login" className={style.button}>Login Usuario</Link>
            <Link to="/cadastro/usuario" className={style.button}>Cadastro Usuario</Link>
            </div>
            <button className={style.menuBotão} onClick={alternarMenu}>
                <img className={style.menu_imagem} src={"../src/assets/icons/menu.svg"}></img>
            </button>
      </div>
    </div>
    <div id={style.titulo_pagina_incicial}>

    </div>
    {/*Componente Sobre*/}
    <Sobre/>
    <footer>
        <div className={style.footer_pagina_principal}>
            <p className={style.footer_text}>
                Todos os Direitos Reservados aos alunos Bruna, Beatriz, Brenda, Daniel e Nicoly 
                do Curso de Desenvolvimento de Sistemas da Etec Matão
            </p>
            <p className={style.footer_text}>
                ©Copyright - 2024 - AbracePets®
            </p>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-facebook.svg"} alt={"Instagram"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="https://instagram.com.br" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-instagram.svg"} alt={"Instagram"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-whatsapp.svg"} alt={"Instagram"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-gmail.svg"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-twitterx.svg"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-tiktok.svg"} className={style.tamanho_redes_sociais}></img>
            </a>
            <a href="#" className={style.redes_sociais_links_footer}>
                <img src={"../src/assets/icons/icone-github.svg"} className={style.tamanho_redes_sociais}></img>
            </a>
        </div>
    </footer>
    <BotaoTopo/>
      </>
  );
}

export default PaginaInicial;
