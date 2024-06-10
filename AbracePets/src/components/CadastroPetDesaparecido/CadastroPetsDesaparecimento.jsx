// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './CadastroPetsDesaparecimento.module.css';
import axios from '../axiosConfig'; // Usando instância axios configurada
import Carregamento from '../Carregamento';

function CadastroPet() {
  const { id } = useParams(); // Pega o ID da URL
  const [pet, setPet] = useState(null);
  const [status, setStatus] = useState('Desaparecido');
  const [dataOcorrido, setDataOcorrido] = useState('');
  const [localOcorrido, setLocalOcorrido] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem('token');
        
        // Busca o pet e seus eventos
        const [petResponse, eventsResponse] = await Promise.all([
          axios.get(`https://abracepets-api.tccnapratica.com.br/pet/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`https://abracepets-api.tccnapratica.com.br/pet/${id}/evento`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        if (petResponse.status !== 200 || eventsResponse.status !== 200) {
          throw new Error('Falha ao carregar os dados do pet ou seus eventos');
        }

        const petData = petResponse.data;
        const eventsData = eventsResponse.data;

        // Encontra o evento mais recente com o status "Desaparecido"
        const ultimoDesaparecido = eventsData.reverse().find(evento => evento.status === 'Desaparecido');

        // Define o estado com o status mais recente
        if (ultimoDesaparecido) {
          setStatus('Desaparecido');
          setDataOcorrido(ultimoDesaparecido.data);
          setLocalOcorrido(ultimoDesaparecido.local);
          setDescricao(ultimoDesaparecido.descricao);
        } else {
          setStatus('Cadastrado'); // Defina um valor padrão se nenhum evento de desaparecimento for encontrado
        }

        setPet(petData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const cadastrarStatus = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const statusData = {
        status: status,
        data: dataOcorrido.trim() !== '' ? dataOcorrido : new Date().toISOString().slice(0, 16), // Envia dataOcorrido se preenchido, senão envia data atual no formato datetime-local
        local: localOcorrido.trim() !== '' ? localOcorrido : '', // Envia localOcorrido se preenchido, senão envia string vazia
        descricao: descricao.trim() !== '' ? descricao : '' // Envia descricao se preenchido, senão envia string vazia
      };
  
      const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage
      const response = await axios.post(`https://abracepets-api.tccnapratica.com.br/pet/${id}/evento`, statusData, {
        headers: {
          'Content-Type': 'application/json', // Define o cabeçalho como JSON
          'Authorization': `Bearer ${token}` // Adiciona o token de acesso nos cabeçalhos da solicitação
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        alert('Status do pet cadastrado com sucesso.');
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setError(`Erro ao cadastrar status: ${error.response.data}`);
      } else if (error.request) {
        setError('Erro ao cadastrar status. Nenhuma resposta do servidor.');
      } else {
        setError('Erro ao cadastrar status. Por favor, tente novamente.');
      }
    }
  };

  if (loading) {
    return <Carregamento/>;
  }

  return (
    <>
    <div className={style.div_login}>
      <div className={style.div_lado_a_lado}>
        <img className={style.dog_and_cat_login} src={"../src/assets/images/AbracePets_Login_e_Cadastro_Roxo_e_Rosa.png"} alt={"Plano-de-Fundo-AbracePets"} />
      </div>
      <div className={style.div_lado_a_lado}>
        <form onSubmit={cadastrarStatus} className={style.div_login_pet}>
          <div className={style.div_icone}>
            <Link to="/home" className={style.icone_voltar}>
              <img src={"../src/assets/icons/voltar.svg"} className={style.icone_voltar} alt="voltar" />
              <h2 className={style.icone_voltar}>Voltar</h2>
            </Link>
          </div>
          <label className={style.label_login_abracepets}>Alterar status de {pet.nome}</label>
          <select
            className={style.input_select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {/*0 = cadastrado / 1 = ParaAdoção / 2 = Adotado / 3 = Desaparecido/*/}
            <option value="" selected >Selecione uma opção</option>
            <option value="1">Para Adoção</option>
            <option value="2">Adotado</option>
            <option value="3" selected>Desaparecido</option>
          </select>
          {status === '3' && (
              <>
                <input
                  className={style.input_email}
                  type="datetime-local"
                  value={dataOcorrido}
                  required
                  onChange={(e) => setDataOcorrido(e.target.value)}
                />
                <input
                  className={style.input_email}
                  type="text"
                  placeholder="Local do ocorrido"
                  value={localOcorrido}
                  onChange={(e) => setLocalOcorrido(e.target.value)}
                />
                <textarea
                  className={style.input_textarea}
                  placeholder="Adicione uma descrição com informações mais detalhadas"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </>
            )}
          {error && <p className={style.error}>{error}</p>}
          <button
            className={style.botão_login}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adicionando status...' : 'Adicionar Status'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default CadastroPet;
