// useUser.js
import { useContext } from 'react';
import { UserContext } from './UserContext'; // Importe o contexto do usuário corretamente

export const useUser = () => useContext(UserContext); // Defina a função useUser que utiliza o contexto do usuário
