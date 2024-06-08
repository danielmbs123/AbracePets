// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import style from '../components/BarraDePesquisa.module.css'

// eslint-disable-next-line react/prop-types
function BarraDePesquisa({ searchTerm, setSearchTerm }) {
    return (
      <>
      <div className={style.div_barra_de_pesquisa}>
        <input 
          className={style.input_barra_de_pesquisa} 
          placeholder={"Procure pelo seu Pet"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do campo de pesquisa
        />
        <button className={style.botao_pesquisa}>
          <img className={style.icone_pesquisa} src={"../src/assets/icons/pesquisa.svg"} alt="Pesquisar" />
        </button>
      </div>
      </>
    );
  }
  
  export default BarraDePesquisa;