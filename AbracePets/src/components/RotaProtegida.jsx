import { Navigate, Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const RotaProtegida = ({ element: Element, token, ...props }) => {
  if (!token) {
    // Se não houver token, redirecione para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderize o componente passado
  return <Route {...props} element={<Element />} />;
};

export default RotaProtegida;