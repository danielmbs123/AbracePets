// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import style from '../components/Configuracoes.module.css';

const AlterarSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [confirmarSenhaNova, setConfirmarSenhaNova] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = sessionStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.UsuarioId;
    } catch (err) {
      setError('Erro ao decodificar o token');
    }
  }

  const handleAlterarSenha = async () => {
    if (senhaNova !== confirmarSenhaNova) {
      setError('As novas senhas não coincidem');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    const payload = {
      id: userId,
      senhaAtual: senhaAtual,
      senhaNova: senhaNova,
    };
  
    console.log('Payload:', payload); // Verifica os dados que estão sendo enviados na requisição
  
    try {
      const response = await fetch('https://abracepets-api.tccnapratica.com.br/usuario/alterar-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      console.log('Response status:', response.status); // Verifica o status da resposta da requisição
  
      if (!response.ok) {
        throw new Error('Erro ao alterar a senha');
      }
  
      setSuccess(true);
      setSenhaAtual('');
      setSenhaNova('');
      setConfirmarSenhaNova('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={style.configuracoes_usuario}>
      {error && <p className={style.error_message}>{error}</p>}
      {success && <p className={style.success_message}>Senha alterada com sucesso!</p>}
      <div className={style.titulo_informacoes_usuario}>Senha Atual</div>
      <div className={style.div_informacoes_usuario}>
        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          className={style.input_informacoes_usuario}
          autoComplete="new-password"
        />
      </div>
      
      <div className={style.titulo_informacoes_usuario}>Nova Senha</div>
      <div className={style.div_informacoes_usuario}>
        <input
          type="password"
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
          className={style.input_informacoes_usuario}
        />
      </div>

      <div className={style.titulo_informacoes_usuario}>Confirmar Nova Senha</div>
      <div className={style.div_informacoes_usuario}>
        <input
          type="password"
          value={confirmarSenhaNova}
          onChange={(e) => setConfirmarSenhaNova(e.target.value)}
          className={style.input_informacoes_usuario}
        />
      </div>

      <button
        className={style.botao_salvar_config}
        onClick={handleAlterarSenha}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'ALTERAR SENHA'}
      </button>
    </div>
  );
};

export default AlterarSenha;