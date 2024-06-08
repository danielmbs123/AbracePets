// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './BotaoVoltar.module.css'; // Certifique-se de criar e ajustar o CSS conforme necessário

const BotaoVoltar = ({ label }) => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <button className={style.botaoVoltar} onClick={handleVoltar}>
      <img src={"../src/assets/icons/voltar.svg"} className={style.imagemVoltar} alt="Voltar" />
      {label}
    </button>
  );
};

BotaoVoltar.propTypes = {
  label: PropTypes.string,
};

BotaoVoltar.defaultProps = {
  label: 'Voltar',
};

export default BotaoVoltar;