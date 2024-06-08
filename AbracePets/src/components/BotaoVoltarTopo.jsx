// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect} from 'react';
import style from'../components/BotaoVoltarTopo.module.css';

const BotãoTopo = () => {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const alternarVisibilidade = () => {
             if(window.pageYOffset > 300) {
                setVisivel(true);
             } else {
                setVisivel(false);
             }
        };

        window.addEventListener('scroll', alternarVisibilidade);
        return () => window.removeEventListener('scroll', alternarVisibilidade);
    }, []);

    const voltarParaTopo = () => {
        const scrollStep = -window.scrollY / (1000 / 15);

        const intervaloRolagem = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(intervaloRolagem);
            }
        }, 16);
    };

    return (
        <div className={style.botao_voltar_ao_topo}>
            {visivel && (
                <button onClick={voltarParaTopo} className={style.botão_topo} type="button">
                    <img className={style.flecha_cima} src={"../src/assets/icons/flechaparacima.svg"} alt={"Flecha para cima"}></img>
                </button>
            )}
        </div>
    );
};

export default BotãoTopo;