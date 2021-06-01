import React from 'react';
import PropTypes from 'prop-types';

function OrderDetails({ orderDetails, index, formatPrice }) {
  return (
    <div>
      <p data-testid={ `${index}-product-name` }>
        Nome
        {' '}
        {orderDetails.name}
      </p>
      <p data-testid={ `${index}-product-qtd` }>
        Qtde
        {' '}
        {orderDetails.quantity}
      </p>
      <p data-testid={ `${index}-product-total-value` }>
        Total
        {' '}
        { formatPrice(orderDetails.total_item_price) }
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetails: PropTypes.objectOf(),
  index: PropTypes.number,
  formatPrice: PropTypes.func,
}.isRequired;

export default OrderDetails;
