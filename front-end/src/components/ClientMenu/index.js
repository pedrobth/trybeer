import React, { useContext } from 'react';
import { Context } from '../../context';
import ClientSidebar from '../ClientSidebar';
import menuClosed from '../../images/menu.png';
import menuOpened from '../../images/beer.png';

const ClientMenu = () => {
  const { menuOpen, setMenuOpen } = useContext(Context);
  return (
    <div>
      <button
        type="button"
        onClick={ () => setMenuOpen(!menuOpen) }
      >
        <img
          src={ menuOpen ? menuOpened : menuClosed }
          data-testid="top-hamburguer"
          alt="menu"
        />
      </button>
      <h1 data-testid="top-title">TryBeer</h1>
      { menuOpen && <ClientSidebar /> }
    </div>
  );
};

export default ClientMenu;
