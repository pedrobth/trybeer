import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { OrderItemDetails } from '../../components';
import { Context } from '../../context';

function OrderDetails({ match }) {
  const { orders } = useContext(Context);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { id } = match.params;

  const order = orders.find((item) => item.id === Number(id));
  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  const fullDate = order.sale_date.split('T');
  const date = fullDate[0].split('-');
  const dateFormated = `${date[2]}/${date[1]}`;

  const formatPrice = (price) => {
    const priceConverted = Number(price).toFixed(2);
    const formattedPrice = `R$ ${priceConverted.replace(/\./g, ',')}`;
    return (formattedPrice);
  };

  useEffect(() => {
    setIsLoading(true);
    api.getOrderDetailsById(user.token, id).then((response) => {
      console.log(response);
      if (response.error) {
        setMessage('Nenhum pedido encontrado');
      } else {
        setOrderDetails(response.message);
      }
    });
    setIsLoading(false);
  }, [user.token, id]);

  return (
    <div>
      <h1 data-testid="top-title">Cliente - Detalhes de Pedido</h1>
      <p data-testid="order-number">
        Pedido
        {' '}
        {id}
      </p>
      <p data-testid="order-date">
        Data pedido:
        {' '}
        {dateFormated}
      </p>

      {
        isLoading
          ? 'Loading...'
          : orderDetails
            .map((item, index) => (
              <OrderItemDetails
                key={ index }
                orderDetails={ item }
                index={ index }
                formatPrice={ formatPrice }
              />))
      }
      <h2>{message}</h2>
      <p data-testid="order-total-value">
        Total:
        {' '}
        {formatPrice(order.total_price)}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.objectOf(),
}.isRequired;

export default OrderDetails;
