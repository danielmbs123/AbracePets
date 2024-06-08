import axios from 'axios';

const autenticarUsuario = async (email, senha) => {
  try {
    const response = await axios.post('https://abracepets-api.tccnapratica.com.br/autenticar', {
      emailLogin: email,
      senha: senha,
    });

    if (response.status === 200 || response.status === 201) {
      const { accessToken } = response.data;
      sessionStorage.setItem('token', accessToken);
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    throw new Error('Falha ao autenticar usuário. Por favor, tente novamente.');
  }
};

export default autenticarUsuario;
