import React from 'react';
import PropTypes from 'prop-types';

function AdminCardDetails({ data, index }) {
  const {
    quantity,
    name,
    price,
  } = data;

  const priceFormat = `R$ ${price.replace(/\./g, ',')}`;
  const productTotalPrice = parseFloat(quantity) * parseFloat(price);
  const productTotalPriceFormat = `R$ ${
    productTotalPrice
      .toFixed(2)
      .replace(/\./g, ',')
  }`;

  return (
    <main>
      <span data-testid={ `${index}-product-qtd` }>
        {quantity}
      </span>
      {' '}
      <span data-testid={ `${index}-product-name` }>
        {name}
      </span>
      {' '}
      <span data-testid={ `${index}-product-total-value` }>
        {productTotalPriceFormat}
      </span>
      {' '}
      <span data-testid={ `${index}-order-unit-price` }>
        {`(${priceFormat})`}
      </span>
      {' '}
    </main>
  );
}

AdminCardDetails.propTypes = {
  data: PropTypes.shape({
    quantity: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    delivery_number: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default AdminCardDetails;
