import { useEffect } from 'react';
import style from '../components/Sobre.module.css'
import BotaoTopo from '../components/BotaoVoltarTopo';

function Sobre() {
    useEffect(() => {
        {/*const options = {
          threshold: 0.1 // Quando 10% do elemento estiver visível, a callback será chamada
        };
        */}
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(style.visible);
            } else {
              entry.target.classList.remove(style.visible);
            }
          });
        }, {/*options*/});
    
        const targets = document.querySelectorAll(`.${style.m_s_v}, .${style.membros}`);
        targets.forEach(target => observer.observe(target));
    
        return () => {
          targets.forEach(target => observer.unobserve(target));
        };
      }, []);

  return (
    <>
    <div id={style.titulo_membros_sobre_nos}>
            SOBRE NÓS
        </div>
    <div className={style.missao_visao_valores}>
            <div className={style.m_s_v}>
                <div className={style.titulo_m_s_v}>
                    Missão
                </div>
                <div className={style.texto_m_s_v}>
                    Conectar corações, promovendo o resgate responsável
                    de animais perdidos por meio de tecnologia 
                    inovadora. Buscamos garantir a segurança e o
                    bem-estar dos pets, fortalecendo laços entre 
                    humanos e animais, proporcionando um lar amoroso.
                </div>
            </div>
            <div className={style.m_s_v}>
                <div className={style.titulo_m_s_v}>
                    Visão
                </div>
                <div className={style.texto_m_s_v}>
                    Ser a principal plataforma de resgate de animais 
                    perdidos, transformando a experiência de 
                    encontrar e acolher pets. Almejamos criar 
                    uma comunidade comprometida com a causa do 
                    resgate, onde a tecnologia e a compaixão andam 
                    juntas para garantir vidas felizes.
                </div>
            </div>
            <div className={style.m_s_v}>
                <div className={style.titulo_m_s_v}>
                    Valores
                </div>
                <div className={style.texto_m_s_v}>
                    Comprometidos com o bem-estar animal, promovemos 
                    resgates inovadores através de soluções tecnológicas
                    éticas. Acreditamos na força da colaboração 
                    comunitária, incentivando parcerias e ações 
                    conjuntas para salvar vidas. Mantemos total 
                    transparência, fomentando confiança na comunidade
                    ResgatePet. Celebramos a diversidade, promovendo
                    a inclusão e respeito por todas as formas de vida.
                </div>
            </div>
        </div>
        {/*<div className={style.titulo_membros}>
            PLANOS ASSINATURA
        </div>
        <div className={style.missao_visao_valores}>
            <div className={style.m_s_v}>
                <div className={style.titulo_m_s_v}>
                    AbracePets Premium.
                </div>
                <div className={style.texto_m_s_v_p}>
                    <div className={style.beneficios}>
                        Coleira com QRCode.
                    </div>
                    <div className={style.beneficios}>
                        Cadastre quantos Pets quiser.
                    </div>
                    <div className={style.beneficios}>
                        Varias cores de coleira.
                    </div>
                    <div className={style.beneficios}>
                        R$24,00.
                    </div>
                </div>
            </div>
            <div className={style.m_s_v}>
                <div className={style.titulo_m_s_v}>
                    AbracePets Empresas
                </div>
                <div className={style.texto_m_s_v_p}>
                    <div className={style.beneficios}>
                        Divulgue sua marca no site
                    </div>
                    <div className={style.beneficios}>
                        Aumente sua visibilidade
                    </div>
                    <div className={style.beneficios}>
                        Ganhe o status de parceiro
                    </div>
                    <div className={style.beneficios}>
                        Tenha seu banner como destaque
                    </div>
                    <div className={style.beneficios}>
                        R$59,99
                    </div>
                </div>
            </div>
            </div>*/}
        <div className={style.titulo_membros}>
            MEMBROS DESENVOLVEDORES
        </div>
        <div id={style.membros_desenvolvedores}>
            <div className={style.membros}>
                <div>
                    <img className={style.ajustar_imagens_membros} src={"../src/assets/images/Bruna-TCC.jpeg"} alt={"Bruna"}></img>
                </div>
                <div className={style.info_desenvolvedor}>
                    <div className={style.nome_desenvolvedor}>
                        Bruna Luiz
                    </div>
                    <div className={style.fala_do_desenvolvedor}>
                        “Gosto de tecnologia desde sempre, mas nunca pensei em ser 
                        desenvolvedor de sistemas, me encontrei e atualmente amo o
                        que faço”.
                    </div>
                </div>
            </div>
            <div className={style.membros}>
                <div>
                <img className={style.ajustar_imagens_membros} src={"../src/assets/images/Brenda-TCC.jpeg"} alt={"Brenda Fiorentino"}></img>
                </div>
                <div className={style.info_desenvolvedor}>
                    <div className={style.nome_desenvolvedor}>
                        Bruna Luiz
                    </div>
                    <div className={style.fala_do_desenvolvedor}>
                        “Gosto de tecnologia desde sempre, mas nunca pensei em ser 
                        desenvolvedor de sistemas, me encontrei e atualmente amo o
                        que faço”.
                    </div>
                </div>
            </div>
            <div className={style.membros}>
                <div>
                    <img className={style.ajustar_imagens_membros} src={"../src/assets/images/Beatriz-TCC.jpeg"} alt={"Beatriz"}></img>
                </div>
                <div className={style.info_desenvolvedor}>
                    <div className={style.nome_desenvolvedor}>
                        Beatriz Gonella
                    </div>
                    <div className={style.fala_do_desenvolvedor}>
                        “Gosto de tecnologia desde sempre, mas nunca pensei em ser 
                        desenvolvedor de sistemas, me encontrei e atualmente amo o
                        que faço”.
                    </div>
                </div>
            </div>
            <div className={style.membros}>
                <div>
                    <img className={style.ajustar_imagens_membros} src={"../src/assets/images/Daniel-TCC.jpg"} alt={"Daniel"}></img>
                </div>
                <div className={style.info_desenvolvedor}>
                    <div className={style.nome_desenvolvedor}>
                        Daniel Manoel
                    </div>
                    <div className={style.fala_do_desenvolvedor}>
                        “Gosto de tecnologia desde sempre, mas nunca pensei em ser 
                        desenvolvedor de sistemas, me encontrei e atualmente amo o
                        que faço”.
                    </div>
                </div>
            </div>
            <div className={style.membros}>
                <div>
                    <img className={style.ajustar_imagens_membros} src={"../src/assets/images/Nicoly-TCC.jpg"} alt={"Nicoly"}></img>
                </div>
                <div className={style.info_desenvolvedor}>
                    <div className={style.nome_desenvolvedor}>
                        Nicoly Amaral
                    </div>
                    <div className={style.fala_do_desenvolvedor}>
                        “Gosto de tecnologia desde sempre, mas nunca pensei em ser 
                        desenvolvedor de sistemas, me encontrei e atualmente amo o
                        que faço”.
                    </div>
                </div>
            </div>
        </div>
        {/*
        <div id={style.titulo_suporte}>
            AVALIAÇÃO
        </div>
        <form>
            <div className={style.suporte}>
                <div className={style.campo_suporte}>
                    <div className={style.email_e_comentario}>
                        <div className={style.suporte_label}>
                            <label className={style.nome_avaliação}>Nome</label>
                            <input placeholder={"Digite seu nome"}  className={style.suporte_input} required></input>
                        </div>
                    </div>
                    <div className={style.email_e_comentario}>
                        <div className={style.suporte_label}>
                            <label className={style.nome_avaliação}>Email</label>
                            <input placeholder={"Digite seu email para fazer um comentario"}  className={style.suporte_input} required></input>
                        </div>
                    </div>
                    <div className={style.email_e_comentario}>
                        <div className={style.suporte_label}>
                            <label className={style.nome_avaliação}>Comentario</label>
                            <textarea className={style.textarea_suporte} placeholder="Digite o seu comentário" required></textarea>
                        </div>
                        <button className={style.botão_email_e_comentario} type="submit">
                            Enviar Comentário
                        </button>
                    </div>
                </div>
            </div>
          </form>
          */}
          <BotaoTopo/>
    </>
  );
}

export default Sobre;
