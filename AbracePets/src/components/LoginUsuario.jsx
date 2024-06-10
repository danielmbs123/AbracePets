/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../components/LoginUsuario.module.css';
import axios from '../components/axiosConfig';
import { useUser } from '../context/useUser';

// eslint-disable-next-line react/prop-types
function LoginUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const identificarLogin = async (e) => {
    e.preventDefault();

    // Evita múltiplas submissões enquanto a requisição está em andamento
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const resposta = await axios.post('/autenticar', {
        emailLogin: email,
        senha: senha,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Adiciona o token de acesso nos cabeçalhos da solicitação
        },
      });

      if (resposta.status === 200 || resposta.status === 201) {
        const { accessToken, id, nome } = resposta.data;
        sessionStorage.setItem('token', accessToken);
        alert(`Olá ${nome},Seja Bem-Vindo ao AbracePets`);
        navigate('/home');
      }
      
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Erro ao fazer login. Por favor, tente novamente.");
    } finally {
      setLoading(false); // Define o estado de carregamento como falso após a conclusão da requisição
    }
  };

  return (
    <>
    <div className={style.div_login}>
      <div className={style.div_lado_a_lado}>
        <img className={style.dog_and_cat_login} src={"../src/assets/images/AbracePets_Login_e_Cadastro_Roxo_e_Rosa.png"} alt={"Plano-de-Fundo-AbracePets"} />
      </div>
      <div className={style.div_lado_a_lado}>
      <form onSubmit={identificarLogin} className={style.div_login_pet}>
        <div className={style.div_icone}>
          <Link to="/home" className={style.icone_voltar}>
            <img src={"../src/assets/icons/voltar.svg"} className={style.icone_voltar} alt="voltar" />
            <h2 className={style.icone_voltar}>Home</h2>
          </Link>
        </div>
        <div className={style.label_login_abracepets}>Login</div>
        <input
          className={style.input_email}
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={style.input_senha}
          placeholder='Digite sua senha'
          value={senha}
          autoComplete="new-password"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button 
          className={style.botão_login} 
          type="submit"
            disabled={loading} // Desativa o botão se estiver carregando
          >
            {loading ? 'Entrando...' : 'ENTRAR'}
          </button>
        <div>
          <label className={style.button}>Ainda não tem conta?</label>
          <Link to="/cadastro/usuario" className={style.button_cadastra}>Cadastre-se</Link>
        </div>
      </form>
      </div>
    </div>
    </>
  );
}

export default LoginUsuario;
