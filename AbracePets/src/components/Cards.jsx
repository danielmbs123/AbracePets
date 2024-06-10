// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from './Cards.module.css';
import BotaoVoltarTopo from './BotaoVoltarTopo';
import Carregamento from './Carregamento';

// eslint-disable-next-line react/prop-types
function Cards({ searchTerm }) {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [missingPets, setMissingPets] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const petResponse = await fetch('https://abracepets-api.tccnapratica.com.br/pet/listar');
      if (!petResponse.ok) {
        throw new Error('Falha ao carregar os dados');
      }
      const petsData = await petResponse.json();

      const petsWithEvents = [];

      for (const pet of petsData) {
        const eventResponse = await axios.get(`https://abracepets-api.tccnapratica.com.br/pet/${pet.id}/evento`);
        const eventsData = eventResponse.data;
        const recentEvent = eventsData.length > 0 ? eventsData[eventsData.length - 1].status : 'Nenhum evento';

        petsWithEvents.push({
          ...pet,
          recentEvent: recentEvent
        });
      }

      setPets(petsWithEvents);
      checkMissingPets(petsWithEvents);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkMissingPets = (pets) => {
    const missingPetsIds = pets.filter(pet => pet.recentEvent === 'Desaparecido').map(pet => pet.id);
    setMissingPets(missingPetsIds);
  };

  if (loading) {
    return <Carregamento />;
  }

  if (error) {
    const handleReload = () => {
      fetchData();
    };

    return (
      <div>
        <p className={style.error_cards}>Erro ao carregar os dados: {error}</p>
        <button onClick={handleReload} className={style.botao_error}>
          Tentar Novamente
          <img className={style.icone_reload} src="../src/assets/icons/reload.svg" alt="Recarregar" />
        </button>
      </div>
    );
  }

  if (pets.length === 0) {
    return <p>Nenhum pet cadastrado.</p>;
  }

  const filteredPets = pets.filter(pet =>
    // eslint-disable-next-line react/prop-types
    pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // eslint-disable-next-line react/prop-types
    pet.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // eslint-disable-next-line react/prop-types
    pet.sexo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // eslint-disable-next-line react/prop-types
    pet.raca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // eslint-disable-next-line react/prop-types
    pet.cor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // eslint-disable-next-line react/prop-types
    pet.recentEvent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={style.div_cards}>
        {filteredPets.map((pet, index) => (
          <Link key={index} to={`/perfil/${pet.id}`} className={`${style.perfil_pet}`}>
            <div className={style.div_nome_do_pet}>
              <div className={style.nome_do_pet}>{pet.nome}</div>
            </div>
            <div className={style.div_alert_cards}>
              {missingPets.includes(pet.id) && (
                <>
                  <label>{pet.recentEvent}</label>
                  <img className={style.icon_alert_cards} src="../src/assets/icons/alerta.svg" alt="Alerta"/>
                </>
              )}
            </div>
            <img src={pet.foto} alt={pet.nome} className={style.ajustar_tamanho_imagenspets}></img>
            <div>
              <label className={"saiba_mais"}>Saiba mais</label>
            </div>
          </Link>
        ))}
      </div>
      <BotaoVoltarTopo />
    </>
  );
}

export default Cards;