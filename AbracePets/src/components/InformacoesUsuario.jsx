// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Carregamento from './Carregamento';
import style from '../components/Configuracoes.module.css';

const InformacoesUsuario = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    nome: false,
    telefone: false,
    facebook: false,
    instagram: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    nome: '',
    telefone: '',
    facebook: '',
    instagram: '',
  });

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
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId]);

  if (loading) {
    return <Carregamento />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggleEditMode = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };   

  const handleSave = async () => {
    const payload = {
      id: userId,
      nome: updatedFields.nome || user.nome,
      telefone: updatedFields.telefone || user.telefone,
      facebook: updatedFields.facebook || user.facebook,
      instagram: updatedFields.instagram || user.instagram,
    };
    
    try {
      const response = await fetch('https://abracepets-api.tccnapratica.com.br/usuario/atualizar-redes-sociais', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    
      if (!response.ok) {
        throw new Error('Erro ao atualizar informações');
      }
    
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing({
        nome: false,
        telefone: false,
        facebook: false,
        instagram: false,
      });
      setUpdatedFields({
        nome: '',
        telefone: '',
        facebook: '',
        instagram: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };    

  return (
    <div className={style.configuracoes_usuario}>
      <div className={style.titulo_informacoes_usuario}>Nome</div>
      <div className={style.div_informacoes_usuario}>
        <input
          placeholder={user.nome}
          disabled={!isEditing.nome}
          value={updatedFields.nome}
          onChange={(e) => handleInputChange(e, 'nome')}
          className={`${style.input_informacoes_usuario} ${isEditing.nome ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.nome ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('nome')}
        />
      </div>

      <div className={style.titulo_informacoes_usuario}>Telefone</div>
      <div className={style.div_informacoes_usuario}>
        <input
          placeholder={user.telefone}
          disabled={!isEditing.phone}
          value={updatedFields.telefone}
          onChange={(e) => handleInputChange(e, 'telefone')}
          className={`${style.input_informacoes_usuario} ${isEditing.phone ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.phone ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('phone')}
        />
      </div>

      <div className={style.titulo_informacoes_usuario}>Facebook</div>
      <div className={style.div_informacoes_usuario}>
        <input
          placeholder={user.facebook}
          disabled={!isEditing.facebook}
          value={updatedFields.facebook}
          onChange={(e) => handleInputChange(e, 'facebook')}
          className={`${style.input_informacoes_usuario} ${isEditing.facebook ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.facebook ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('facebook')}
        />
      </div>

      <div className={style.titulo_informacoes_usuario}>Instagram</div>
      <div className={style.div_informacoes_usuario}>
        <input
          placeholder={user.instagram}
          disabled={!isEditing.instagram}
          value={updatedFields.instagram}
          onChange={(e) => handleInputChange(e, 'instagram')}
          className={`${style.input_informacoes_usuario} ${isEditing.instagram ? style.edit_mode : ''}`}
        />
        <img
          className={style.botao_editar}
          src={isEditing.instagram ? "../src/assets/icons/salvar.svg" : "../src/assets/icons/editar.svg"}
          onClick={() => toggleEditMode('instagram')}
        />
      </div>
      <button className={style.botao_salvar_config} onClick={handleSave}>SALVAR</button>
    </div>
  );
};

export default InformacoesUsuario;