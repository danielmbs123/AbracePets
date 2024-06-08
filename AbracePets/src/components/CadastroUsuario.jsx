// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../components/CadastroUsuario.module.css';
import axios from '../components/axiosConfig'; // Usando instância axios configurada

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmacao, setEmailConfirmacao] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    setError('');

    if (senha !== senhaConfirmacao) {
      setError('As senhas não coincidem');
      return;
    }

    if (email !== emailConfirmacao) {
      setError('Os emails não coincidem');
      return;
    }

    try {
      const response = await axios.post('/usuario', {
        nome: nome,
        emailLogin: email,
        emailLoginConfirmacao: emailConfirmacao,
        senha: senha,
        senhaConfirmacao: senhaConfirmacao,
      });

      if (response.status === 200
        || response.status === 201) {
          alert('Usuário cadastrado com sucesso.');
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          setError(`Erro ao cadastrar usuário: ${error.response.data}`);
          console.error('Erro ao cadastrar usuário:', error.response.data);
        } else if (error.request) {
          setError('Erro ao cadastrar usuário. Nenhuma resposta do servidor.');
          console.error('Erro ao cadastrar usuário:', error.request);
        } else {
          setError('Erro ao cadastrar usuário. Por favor, tente novamente.');
          console.error('Erro ao cadastrar usuário:', error.message);
        }
      }
    };
  
    return (
      <div className={style.div_login}>
        <div className={style.div_lado_a_lado}>
          <img className={style.dog_and_cat_login} src={"../src/assets/images/AbracePets_Login_e_Cadastro_Roxo_e_Rosa.png"} alt={"Plano-de-Fundo-AbracePets"} />
        </div>
        <div className={style.div_lado_a_lado}>
          <form onSubmit={cadastrarUsuario} className={style.div_login_pet}>
            <div className={style.div_icone}>
              <Link to="/home" className={style.icone_voltar}>
                <img src={"../src/assets/icons/voltar.svg"} className={style.icone_voltar} alt="voltar" />
                <h2 className={style.icone_voltar}>Home</h2>
              </Link>
            </div>
            <label className={style.label_login_abracepets}>Cadastro Usuario</label>
            <input
              required
              className={style.input_email}
              placeholder='Digite seu nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              required
              type="email"
              className={style.input_email}
              placeholder='Digite seu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="email"
              className={style.input_email}
              placeholder='Confirme seu email'
              value={emailConfirmacao}
              onChange={(e) => setEmailConfirmacao(e.target.value)}
            />
            <input
              required
              type="password"
              className={style.input_senha}
              placeholder='Digite sua senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <input
              required
              type="password"
              className={style.input_senha}
              placeholder='Confirme sua senha'
              value={senhaConfirmacao}
              onChange={(e) => setSenhaConfirmacao(e.target.value)}
            />
              <button className={style.botão_login} type="submit">Cadastre-se</button>
            <div>
              <label className={style.button}>Já possui conta?</label>
              <Link to="/login" className={style.button_cadastra} >Entrar</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default CadastroUsuario;
  