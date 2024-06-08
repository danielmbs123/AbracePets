// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import style from '../components/Administrador.module.css';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Administrador() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorPets, setErrorPets] = useState(null);
  const [searchTermUsers, setSearchTermUsers] = useState('');
  const [searchTermPets, setSearchTermPets] = useState('');
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPagePets, setCurrentPagePets] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [petsPerPage, setPetsPerPage] = useState(5);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Se não houver token, redireciona para a tela de login
      navigate('/');
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.UsuarioId;

        const response = await axios.get(`https://abracepets-api.tccnapratica.com.br/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const currentUser = response.data;
        console.log(currentUser);
        if (currentUser.isAdmin === false || currentUser.isAdmin === 0 ) {
          // Redirecionar para a tela inicial se o usuário não for um administrador
          navigate('/');
        }

      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
      }
    };

    fetchCurrentUser();
  }, [token, navigate]);

  {/*Listar todos os Usuários*/}
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('https://abracepets-api.tccnapratica.com.br/usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setErrorUsers(error.message);
      }
    };

    {/*Listar todos os Pets*/}
    const fetchPets = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('https://abracepets-api.tccnapratica.com.br/pet/listar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(response.data);
      } catch (error) {
        setErrorPets(error.message);
      }
    };

    fetchUsers();
    fetchPets();
  }, []);

  // Função para filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(searchTermUsers.toLowerCase())
  );

  // Função para paginar usuários
  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Função para mudar a página de usuários
  const paginateUsers = pageNumber => setCurrentPageUsers(pageNumber);

  // Função para filtrar pets com base no termo de pesquisa
  const filteredPets = pets.filter(pet =>
    pet.nome.toLowerCase().includes(searchTermPets.toLowerCase())
  );

  // Função para paginar pets
  const indexOfLastPet = currentPagePets * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  // Função para mudar a página de pets
  const paginatePets = pageNumber => setCurrentPagePets(pageNumber);

    return (
      <>
      <div className={style.div_adm}>
        <div className={style.label_administrador}>
          <Link to="/home">
            <img className={style.icone_voltar_administrador} src="../src/assets/icons/voltar.svg"></img>
          </Link>
          <Link to="/">
            <img className={style.logo_abracepets_adm} src="../src/assets/LogotipoAbracePetsSVG.svg"></img>
          </Link>
        <label>Administrador</label>
      </div>

        <div className={style.menu_administrador}>
          Menu
      </div>
  
        {/* Tabela de usuários */}
       
          <>
            {errorUsers ? (
              <p>Erro ao carregar os usuários: {errorUsers}</p>
            ) : (
              <div className={style.tabela_usuario}>
                <div className={style.titulo_usuario}>Usuários Cadastrados</div>
                {/* Barra de pesquisa para usuários */}
                <div className={style.pesquisa_e_paginação}>
                  {/*Paginação Tabela*/}
                    <select className={style.label_numero_paginação} value={usersPerPage} onChange={e => setUsersPerPage(parseInt(e.target.value))}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  <input className={style.barra_de_pesquisa_usuario}
                    type="text"
                    placeholder="Pesquisar usuários..."
                    onChange={e => setSearchTermUsers(e.target.value)}
                  />
                  {/*
                  <button className={style.adicionar_novo_usuario}>
                    <img className={style.icones_crud_administrador} src={"../src/assets/icons/add.svg"}></img>
                  </button>
                  */}
                </div>
            <table className={style.tabela_crud_usuario}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  {/*<th>Email</th>*/}
                  <th>Status</th>
                  {/* Adicione mais colunas aqui, se necessário */}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.telefone}</td>
                    <td>{user.isAdmin ? 'ADM' : 'Usuário Normal'}</td>
                    {/*<td>{user.email}</td>*/}
                    <td>
                      <button className={style.botão_crud_editar}>
                        <img className={style.icones_crud_administrador} src={"../src/assets/icons/botao_ativado.svg"}></img>
                      </button>
                    </td>
                    {/* Adicione mais colunas aqui, se necessário */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Paginação para usuários */}
            <ul className={style.numeros_paginação}>
              {filteredUsers.length > usersPerPage &&
                [...Array(Math.ceil(filteredUsers.length / usersPerPage))].map((_, index) => (
                  <li className={style.numeros} key={index} onClick={() => paginateUsers(index + 1)}>
                    {index + 1}
                  </li>
                ))}
            </ul>
              </div>
            )}
          </>
      
  
        {/* Tabela de pets */}
        
            <>
              {errorPets ? (
                <p>Erro ao carregar os pets: {errorPets}</p>
              ) : (
                <div className={style.tabela_usuario}>
                  <div className={style.titulo_usuario}>Pets Cadastrados</div>
            {/* Barra de pesquisa para pets */}
            <div className={style.pesquisa_e_paginação}>
              {/* Paginação Tabela */}
              <select className={style.label_numero_paginação} value={petsPerPage} onChange={e => setPetsPerPage(parseInt(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <input className={style.barra_de_pesquisa_usuario}
                type="text"
                placeholder="Pesquisar pets..."
                onChange={e => setSearchTermPets(e.target.value)}
              />
              {/*<button className={style.adicionar_novo_usuario}>
                <img className={style.icones_crud_administrador} src={"../src/assets/icons/add.svg"} alt="Adicionar Pet"></img>
              </button>*/}
            </div>
            <table className={style.tabela_crud_usuario}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Foto</th>
                  <th>Status</th>
                  <th>Status</th>
                  {/* Adicione mais colunas aqui, se necessário */}
                </tr>
              </thead>
              <tbody>
                {currentPets.map(pet => (
                  <tr key={pet.id}>
                    <td>{pet.nome}</td>
                    <td>
                      <img src={pet.foto} className={style.foto_pet_adm} alt={pet.nome} />
                    </td>
                    <td>{pet.status}</td>
                    <td>
                      <button className={style.botão_crud_editar}>
                        <img className={style.icones_crud_administrador} src={"../src/assets/icons/botao_ativado.svg"}></img>
                      </button>
                    </td>
                    {/* Adicione mais colunas aqui, se necessário */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Paginação para pets */}
            <ul className={style.numeros_paginação}>
              {filteredPets.length > petsPerPage &&
                [...Array(Math.ceil(filteredPets.length / petsPerPage))].map((_, index) => (
                  <li className={style.numeros} key={index} onClick={() => paginatePets(index + 1)}>
                    {index + 1}
                  </li>
                ))}
            </ul>
                </div>
              )}
            </>
        </div>
        </>
    );
  }

export default Administrador;
