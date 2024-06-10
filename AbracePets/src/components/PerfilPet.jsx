// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from '../components/PerfilPet.module.css';
import Carregamento from './Carregamento';
import { Link } from 'react-router-dom';

function PerfilPet() {
  const { id } = useParams(); // Pega o ID da URL
  const [pet, setPet] = useState(null);
  const [ownerContacts, setOwnerContacts] = useState(null); // Estado para armazenar os detalhes de contato do dono
  const [ownerName, setOwnerName] = useState('');
  const [eventos, setEventos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));
  // eslint-disable-next-line no-unused-vars
  const [missingPets, setMissingPets] = useState([]);
  const ultimoEvento = eventos[eventos.length - 1];

  const fetchData = async (petId) => {
    setLoading(true);
    setError(null);
    try {
      // Busca os dados do pet específico
      const petResponse = await fetch(`https://abracepets-api.tccnapratica.com.br/pet/${petId}`);
      if (!petResponse.ok) {
        throw new Error('Falha ao carregar os dados do pet');
      }
      const petData = await petResponse.json();

      // Busca os eventos do pet específico
      const eventResponse = await axios.get(`https://abracepets-api.tccnapratica.com.br/pet/${petId}/evento`);
      const eventsData = eventResponse.data;
      const recentEvent = eventsData.length > 0 ? eventsData[eventsData.length - 1].status : 'Cadastrado';

      // Atualiza o estado com os dados do pet específico
      setPet({
        ...petData,
        recentEvent: recentEvent
      });

      // Verifica se o pet está desaparecido e atualiza a lista de pets desaparecidos, se necessário
      checkMissingPets([{ ...petData, recentEvent: recentEvent }]);

      setLoading(false);
      console.log( "Olaá mundo", eventsData);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Chama a função fetchData passando o petId desejado
    fetchData(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const checkMissingPets = (pets) => {
    const missingPetsIds = pets.filter(pet => pet.recentEvent === 'Desaparecido').map(pet => pet.id);
    setMissingPets(missingPetsIds);
  };

  const token = sessionStorage.getItem('token');

  const fetchPet = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://abracepets-api.tccnapratica.com.br/pet/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Pet não encontrado');
      }
      const data = await response.json();
      setPet(data);

      fetchOwnerContacts(data.usuarioId);
      fetchDesaparecimento(data.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnerContacts = async (userId) => {
    try {
      const response = await fetch(`https://abracepets-api.tccnapratica.com.br/usuario/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Detalhes do dono não encontrados');
      }
      const userData = await response.json();
      setOwnerContacts(userData);
      setOwnerName(userData.nome);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const fetchDesaparecimento = async (petId) => {
    try {
      const response = await fetch(`https://abracepets-api.tccnapratica.com.br/pet/${petId}/evento`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Eventos não encontrados');
      }
      const eventosData = await response.json();
      
      eventosData.sort((a, b) => new Date(b.data) - new Date(a.data));
      
      const eventoMaisRecente = eventosData[0];
      
      setEventos([eventoMaisRecente]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Carregamento />;
  }

  if (!pet) {
    return <p>Nenhum pet encontrado.</p>;
  }

  return (
    <>
      <div className={style.div_principal_perfilpet}>
        <div className={style.div_perfil_pet}>
          <div className={style.perfil_pet}>
            <Link to="/home" className={style.icone_voltar}>
              <img src={"../src/assets/icons/voltar.svg"} className={style.imagem_voltar} alt="Voltar" />
            </Link>
            <div className={style.nome_pet_inicio}>
              Informações de {pet.nome}
            </div>
          </div>
          <div className={style.informacoes_pets}>
            <img src={pet.foto} alt={pet.nome} className={style.foto_pet} />
          </div>
          <div className={style.informacoes_pets}>
            <label className={style.pets_especificas}>
              <span className={style.titulopets_especificas}>
                Nome do Dono:
              </span> 
              <div className={style.value_pets}>
                {ownerName}
              </div>
            </label>

            <label className={style.pets_especificas}>
              <span className={style.titulopets_especificas}>
                Situação Atual:
              </span>
              <div className={style.value_pets}>
                {pet.recentEvent}
              </div>
            </label>

            {pet.recentEvent === 'Desaparecido' && (
              <>
                <div className={style.div_desaparecimento}>
                  <label className={style.pets_especificas}>
                    <span className={style.titulopets_especificas}>
                      Data do Ocorrido:
                    </span>
                    <div className={style.value_pets}>
                      {ultimoEvento && new Date(ultimoEvento.data).toLocaleString()}
                    </div>
                  </label>

                  <label className={style.pets_especificas}>
                    <span className={style.titulopets_especificas}>
                      Local do Ocorrido:
                    </span>
                    <div className={style.value_pets}>
                      {ultimoEvento && ultimoEvento.local}
                    </div>
                  </label>

                  <label className={style.pets_especificas}>
                    <span className={style.titulopets_especificas}>
                      Descrição:
                    </span>
                    <div className={style.value_pets}>
                      {ultimoEvento && ultimoEvento.descricao}
                    </div>
                  </label>

                  <div className={style.div_alerta_contato}>
                    <img src="../src/assets/icons/alerta.svg"></img>
                    <label className={style.value_pets}>Entre em contato com o dono do pet caso o tenha encontrado</label>
                  </div>
                </div>
              </>
            )}
        <label className={style.pets_especificas}>
          <span className={style.titulopets_especificas}>
            Sexo:
          </span> 
          <div className={style.value_pets}>
            {pet.sexo}
          </div>
        </label>

        <label className={style.pets_especificas}>
          <span className={style.titulopets_especificas}>
            Espécie:
          </span>
          <div className={style.value_pets}>
            {pet.especie}
          </div>
        </label>

        <label className={style.pets_especificas}>
          <span className={style.titulopets_especificas}>
            Raça:</span> 
          <div className={style.value_pets}>
            {pet.raca}
          </div>
        </label>

        <label className={style.pets_especificas}>
          <span className={style.titulopets_especificas}>
            Cor:
          </span> 
          <div className={style.value_pets}>
            {pet.cor}
          </div>
        </label>
      </div>

        <div className={style.contatos_dono_pet}>
        {isLoggedIn && ownerContacts ? (
              <>
                <Link to={`https://www.facebook.com/${ownerContacts.facebook}`} target="_blank" rel="noopener noreferrer">
                  <img src={"../src/assets/icons/icone-facebook.svg"} className={style.icones_contato_dono} alt="Facebook" />
                </Link>
                
                <Link to={`https://www.instagram.com/${ownerContacts.instagram}`} target="_blank" rel="noopener noreferrer">
                  <img src={"../src/assets/icons/icone-instagram.svg"} className={style.icones_contato_dono} alt="Instagram" />
                </Link>

                <Link to={`mailto:${ownerContacts.emailLogin}`} target="_blank" rel="noopener noreferrer">
                  <img src={"../src/assets/icons/icone-gmail.svg"} className={style.icones_contato_dono} alt="E-mail" />
                </Link>

                <Link to={`https://wa.me/${ownerContacts.telefone}`} target="_blank" rel="noopener noreferrer">
                  <img src={"../src/assets/icons/icone-whatsapp.svg"} className={style.icones_contato_dono} alt="WhatsApp" />
                </Link>
              </>
            ) : (
              <>
              <div className={style.div_necessita_login}>
                <div className={style.dados_nao_autorizado}>
                  <div className={style.mensagem_não_logado}>
                    Para ter acesso ao contato, por questão de segurança dos 
                    dados do dono do pet é necessário estar logado.
                    <div className={style.div_cadeado}>
                      <img className={style.icone_cadeado} src="../src/assets/icons/cadeado.svg"></img>
                    </div>
                  </div>
                  </div>
                  <Link to="/login" className={style.login}>Faça login</Link>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilPet;