// EditarInformacoesPets.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Carregamento from './Carregamento';
import style from '../components/EditarInformacoesPets.module.css';

// eslint-disable-next-line react/prop-types
const EditarInformacoesPets = ({ petId, token, onCancel }) => {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    nome: false,
    foto: false,
    especie: false,
    sexo: false,
    raca: false,
    cor: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    nome: '',
    foto: '',
    especie: '',
    sexo: '',
    raca: '',
    cor: '',
  });

  useEffect(() => {
    if (!token) {
      setError('Você precisa estar logado para ver esta página.');
      setLoading(false);
      return;
    }

    const fetchPet = async () => {
      try {
        const response = await fetch(`https://abracepets-api.tccnapratica.com.br/pet/${petId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do pet');
        }

        const petData = await response.json();
        setPet(petData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [token, petId]);

  const retryFetchPet = () => {
    setError(null);
    setLoading(true);
    // eslint-disable-next-line no-undef
    fetchPet();
  };

  if (loading) {
    return <Carregamento />;
  }

  if (error) {
    return (
      <div>
        <button onClick={retryFetchPet}>Tentar Novamente</button>
      </div>
    );
  }

  const toggleEditMode = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = async (e, field) => {
    if (field === 'foto') {
      const file = e.target.files[0];
      // eslint-disable-next-line no-undef
      const base64Image = await toBase64(file);
      setUpdatedFields((prev) => ({ ...prev, [field]: base64Image }));
    } else {
      const value = e.target.value;
      setUpdatedFields((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    const payload = {
      id: petId,
      nome: updatedFields.nome || pet.nome,
      foto: updatedFields.foto || pet.foto,
      especie: updatedFields.especie || pet.especie,
      sexo: updatedFields.sexo || pet.sexo,
      raca: updatedFields.raca || pet.raca,
      cor: updatedFields.cor || pet.cor,
    };

    try {
      const response = await fetch('https://abracepets-api.tccnapratica.com.br/pet/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar informações do pet');
      }

      const updatedPet = await response.json();
      setPet(updatedPet);
      setIsEditing({
        nome: false,
        foto: false,
        especie: false,
        sexo: false,
        raca: false,
        cor: false,
      });
      setUpdatedFields({
        nome: '',
        foto: '',
        especie: '',
        sexo: '',
        raca: '',
        cor: '',
      });
      onCancel();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={style.configuracoes_pet}>
      <div className={style.titulo_informacoes_pet}>Nome</div>
      <div className={style.div_informacoes_pet}>
        <input
          placeholder={pet.nome}
          disabled={!isEditing.nome}
          value={updatedFields.nome}
          onChange={(e) => handleInputChange(e, 'nome')}
          className={`${style.input_informacoes_pet} ${isEditing.nome ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.nome ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('nome')}
        />
      </div>

      <div className={style.titulo_informacoes_pet}>Foto</div>
      <div className={style.div_informacoes_pet}>
        <input
          type="file"
          disabled={!isEditing.foto}
          onChange={(e) => handleInputChange(e, 'foto')}
          className={`${style.input_informacoes_pet} ${isEditing.foto ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.foto ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('foto')}
        />
      </div>

      <div className={style.titulo_informacoes_pet}>Espécie</div>
      <div className={style.div_informacoes_pet}>
        <input
          placeholder={pet.especie}
          disabled={!isEditing.especie}
          value={updatedFields.especie}
          onChange={(e) => handleInputChange(e, 'especie')}
          className={`${style.input_informacoes_pet} ${isEditing.especie ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.especie ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('especie')}
        />
      </div>

      <div className={style.titulo_informacoes_pet}>Sexo</div>
      <div className={style.div_informacoes_pet}>
        <input
          placeholder={pet.sexo}
          disabled={!isEditing.sexo}
          value={updatedFields.sexo}
          onChange={(e) => handleInputChange(e, 'sexo')}
          className={`${style.input_informacoes_pet} ${isEditing.sexo ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.sexo ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('sexo')}
        />
      </div>

      <div className={style.titulo_informacoes_pet}>Raça</div>
      <div className={style.div_informacoes_pet}>
        <input
          placeholder={pet.raca}
          disabled={!isEditing.raca}
          value={updatedFields.raca}
          onChange={(e) => handleInputChange(e, 'raca')}
          className={`${style.input_informacoes_pet} ${isEditing.raca ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.raca ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('raca')}
        />
      </div>

      <div className={style.titulo_informacoes_pet}>Cor</div>
      <div className={style.div_informacoes_pet}>
        <input
          placeholder={pet.cor}
          disabled={!isEditing.cor}
          value={updatedFields.cor}
          onChange={(e) => handleInputChange(e, 'cor')}
          className={`${style.input_informacoes_pet} ${isEditing.cor ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.cor ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('cor')}
        />
      </div>
      <button className={style.botao_salvar_config} onClick={handleSave}>SALVAR</button>
      <button className={style.botao_salvar_config} onClick={onCancel}>CANCELAR</button>
    </div>
  );
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

export default EditarInformacoesPets;