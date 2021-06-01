import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Order({ order, index }) {
  const fullDate = order.sale_date.split('T');
  const date = fullDate[0].split('-');
  const dateFormated = `${date[2]}/${date[1]}`;

  return (
    <Link
      to={ `/orders/${order.id}` }
      data-testid={ `${index}-order-card-container` }
    >
      <p data-testid={ `${index}-order-number` }>
        Pedido
        {' '}
        {order.id}
      </p>
      <p data-testid={ `${index}-order-date` }>
        Data:
        {dateFormated}
      </p>
      <p data-testid={ `${index}-order-total-value` }>
        Valor:
        {`R$ ${order.total_price.replace(/\./g, ',')}`}
      </p>
    </Link>
  );
}

Order.propTypes = {
  order: PropTypes.objectOf(),
  index: PropTypes.number,
}.isRequired;

export default Order;
