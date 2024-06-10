/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../components/CadastroPets.module.css';
import axios from '../components/axiosConfig'; // Usando instância axios configurada

function CadastroPet() {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState(null);
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [cor, setCor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cadastrarPet = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const fotoBase64 = await toBase64(foto); // Converte a foto para base64

      const petData = {
        nome: nome,
        foto: fotoBase64,
        especie: especie,
        sexo: sexo,
        raca: raca,
        cor: cor
      };

      const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage

      const response = await axios.post('https://abracepets-api.tccnapratica.com.br/pet/adicionar', petData, {
        headers: {
          'Content-Type': 'application/json', // Define o cabeçalho como JSON
          'Authorization': `Bearer ${token}` // Adiciona o token de acesso nos cabeçalhos da solicitação
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Pet cadastrado com sucesso.');
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setError(`Erro ao cadastrar pet: ${error.response.data}`);
        console.error('Erro ao cadastrar pet:', error.response.data);
      } else if (error.request) {
        setError('Erro ao cadastrar pet. Nenhuma resposta do servidor.');
        console.error('Erro ao cadastrar pet:', error.request);
      } else {
        setError('Erro ao cadastrar pet. Por favor, tente novamente.');
        console.error('Erro ao cadastrar pet:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para converter arquivo para base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className={style.div_login}>
      <div className={style.div_lado_a_lado}>
        <img className={style.dog_and_cat_login} src={"../src/assets/images/AbracePets_Login_e_Cadastro_Roxo_e_Rosa.png"} alt={"Plano-de-Fundo-AbracePets"} />
      </div>
      <div className={style.div_lado_a_lado}>
        <form onSubmit={cadastrarPet} className={style.div_login_pet}>
          <div className={style.div_icone}>
            <Link to="/home" className={style.icone_voltar}>
              <img src={"../src/assets/icons/voltar.svg"} className={style.icone_voltar} alt="voltar" />
              <h2 className={style.icone_voltar}>Voltar</h2>
            </Link>
          </div>
          <label className={style.label_login_abracepets}>Cadastro de Pet</label>
          <input
            className={style.input_email}
            placeholder='Nome do pet'
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={style.input_email}
            type="file"
            required
            onChange={(e) => setFoto(e.target.files[0])}
          />
          <input
            className={style.input_email}
            placeholder='Espécie do pet'
            value={especie}
            required
            onChange={(e) => setEspecie(e.target.value)}
          />
          <select
            className={style.input_select}
            value={sexo}
            required
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="" selected >Selecione uma opção</option>
            <option value={"0"} className={style.opcao_m_f}>Macho</option>
            <option value={"1"} className={style.opcao_m_f}>Fêmea</option>
          </select>
          <input
            className={style.input_email}
            placeholder='Raça do pet'
            value={raca}
            required
            onChange={(e) => setRaca(e.target.value)}
          />
          <input
            className={style.input_email}
            placeholder='Cor do pet'
            value={cor}
            required
            onChange={(e) => setCor(e.target.value)}
          />
          {error && <p className={style.error}>{error}</p>}
          <button 
            className={style.botão_login} 
            type="submit"
            disabled={loading} // Desativa o botão se estiver carregando
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroPet;