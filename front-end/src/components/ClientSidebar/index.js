import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context';

import { handleLogout } from '../../services/localStorage';

const ClientSidebar = () => {
  const { setMenuOpen } = useContext(Context);
  const history = useHistory();
  const handleRoute = (path) => {
    if (path === '/login') handleLogout();
    history.push(path);
    setMenuOpen(false);
  };
  return (
    <div className="side-menu-container">
      <button
        type="button"
        data-testid="side-menu-item-products"
        onClick={ () => handleRoute('/products') }
      >
        Produtos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-orders"
        onClick={ () => handleRoute('/orders') }
      >
        Meus pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-profile"
        onClick={ () => handleRoute('/profile') }
      >
        Meu Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => handleRoute('/login') }
      >
        Sair
      </button>
    </div>
  );
};

export default ClientSidebar;
