// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Carregamento from './Carregamento';
import BotaoVoltarTopo from './BotaoVoltarTopo';
import style from '../components/InformacoesPets.module.css';
import EditarInformacoesPets from './EditarInformacoesPets';

function InformacoesPets() {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [editSuccessMessage, setEditSuccessMessage] = useState('');
  const [confirmarExclusao, setConfirmarExclusao] = useState({}); // Estado para controlar a confirmação da exclusão por pet

  const token = sessionStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.UsuarioId;
    } catch (err) {
      setError('Erro ao decodificar o token');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      setError('Você precisa estar logado para ver esta página.');
      setLoading(false);
      return;
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

    fetchUser();
    fetchPets();
  }, [token, userId]);

  const handleDelete = async (petId) => {
    try {
      const response = await fetch(`https://abracepets-api.tccnapratica.com.br/pet/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir o pet');
      }

      // Atualizar a lista de pets após a exclusão
      const updatedPets = pets.filter(pet => pet.id !== petId);
      setPets(updatedPets);
    } catch (error) {
      setError(error.message);
    }
  };

  const retryFetchData = () => {
    setError(null);
    setLoading(true);
    // eslint-disable-next-line no-undef
    fetchUser();
    // eslint-disable-next-line no-undef
    fetchPets();
  };

  if (loading) {
    return <Carregamento />;
  }

  if (editSuccessMessage) {
    return (
      <div>
        <p className={style.success_message}>{editSuccessMessage}</p>
      </div>
    );
  }  

  if (error) {
    return (
      <div>
        <p className={style.error_cards}>Erro ao carregar os dados: {error}</p>
        <button className={style.botao_error} onClick={retryFetchData}>Tentar Novamente
          <img className={style.icone_reload} src="../src/assets/icons/reload.svg" alt="Recarregar" />
        </button>
      </div>
    );
  }

  const petsUsuario = pets.filter(pet => pet.usuarioId === user.id);

  if (petsUsuario.length === 0) {
    return <p>Nenhum pet cadastrado, cadastre para visualizá-los aqui.</p>;
  }

  return (
    <>
      {editingPet ? (
        <EditarInformacoesPets petId={editingPet.id} token={token} onCancel={() => setEditingPet(null)} />
      ) : (
        <div>
          {petsUsuario.map(pet => (
            <div key={pet.id} className={style.div_pet_alterar}>
              <div className={style.div_nome_e_foto}>
                <label className={style.label_nome}>{pet.nome}</label>
                <img className={style.foto_alterar} src={pet.foto} alt={pet.nome} />
              </div>
              <div className={style.div_botão_editar_informações_pets}>
                <button 
                  className={style.botão_editar_informacoes_pets} 
                  onClick={() => setEditingPet(pet)}
                >
                  Editar Informações
                </button>
                {/* Renderiza o botão "Excluir Pet" ou "Confirmar" dependendo do estado */}
                {!confirmarExclusao[pet.id] ? (
                  <button 
                    className={style.botão_excluir_pet} 
                    onClick={() => setConfirmarExclusao({ ...confirmarExclusao, [pet.id]: true })}
                  >
                    Excluir Pet
                  </button>
                ) : (
                  <button 
                    className={style.botão_confirmar_exclusao} 
                    onClick={() => {
                      handleDelete(pet.id);
                      setConfirmarExclusao({ ...confirmarExclusao, [pet.id]: false });
                    }}
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <BotaoVoltarTopo />
    </>
  );  
}

export default InformacoesPets;
