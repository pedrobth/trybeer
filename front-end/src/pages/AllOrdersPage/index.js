import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Order } from '../../components';
import api from '../../services/api';
import { Context } from '../../context';

function AllOrders() {
  const { orders, setOrders } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  useEffect(() => {
    if (!user.name) history.push('/login');
    setIsLoading(true);
    api.getAllOrders(user.token).then((response) => {
      if (response.error) {
        setMessage('Nenhum pedido encontrado');
      } else {
        setOrders(response.message);
      }
    });
    setIsLoading(false);
  }, [history, setOrders, user.name, user.token]);
  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {
        isLoading
          ? 'Loading...'
          : orders
            .map((item, index) => <Order key={ item } order={ item } index={ index } />)
      }
      <h2>{ message }</h2>
    </div>
  );
}

export default AllOrders;
