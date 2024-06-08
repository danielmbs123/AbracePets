/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import style from '../components/PetsDesaparecidos.module.css';
import Carregamento from './Carregamento';
import BotaoVoltarTopo from './BotaoVoltarTopo';
// eslint-disable-next-line no-unused-vars
import AlertaDesaparecimento from './CadastroPetDesaparecido/CadastroPetsDesaparecimento';
//import { useUser } from '../context/useUser';

// eslint-disable-next-line react/prop-types
function PetsDesaparecido({ searchTerm }) {
  //const { userId } = useUser();
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //token obtido
  const token = sessionStorage.getItem('token');
  let userId = null;

  const navigate = useNavigate();

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchUser();
    fetchPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  const handleAlertaDesaparecimento = (petId) => {
    // Redirecionar para a rota desejada
    navigate(`/cadastrar-desaparecimento/${petId}`);
  };

  const tentarNovamente = () => {
    setLoading(true);
    setError(null);
    fetchUser();
    fetchPets();
  };

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

  const petsUsuario = pets.filter(pet => pet.usuarioId === user?.id);

  if (petsUsuario.length === 0) {
    return (
      <>
      <label className={style.meus_pets}>Informar Desaparecimento</label>
      <div className={style.div_sem_pets}>
        <p className={style.texto_sem_pets}>Você não possui pets cadastrados, cadastre para vê-los aqui.</p>
      </div>
      </>
    );
  }

  return (
    <>
      <label className={style.meus_pets}>Mudar Status</label>
      <div>
        {petsUsuario.filter(pet => pet.nome.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(pet => (
            <div key={pet.id} className={style.div_pets}>
              <div className={style.nome_pet}>{pet.nome}</div>
              <img className={style.foto_pet} src={pet.foto} alt={pet.nome} />
              {/* Adicione mais detalhes sobre o pet conforme necessário */}
              <button
                className={style.botao_mudar_status}
                onClick={() => handleAlertaDesaparecimento(pet.id)}
              >
                Alterar Status
                <img
                  className={style.icone_alerta_pet}
                  src="../src/assets/icons/alerta.svg"
                  alt="Ícone de alerta"
                />
              </button>
            </div>
          ))}
      </div>
      <BotaoVoltarTopo />
    </>
  );
}

export default PetsDesaparecido;
