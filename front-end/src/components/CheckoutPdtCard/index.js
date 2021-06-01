import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context';
// import './styles.css';

function CheckoutPdtCard({ data, index }) {
  const [quantity, setQuantity] = useState(0);
  const { cart, addToCart, removeFromCart } = useContext(Context);
  const {
    id,
    name,
    price,
    url_image: urlImage,
  } = data;

  const formatedPrice = `R$ ${(price * quantity).toFixed(2).replace(/\./g, ',')}`;
  const priceFormat = `(R$ ${price.replace(/\./g, ',')} un)`;

  useEffect(() => {
    const currentProduct = cart.find((prod) => prod.id === id);
    if (currentProduct) setQuantity(currentProduct.quantity);
    else setQuantity(0);
  }, [cart, id]);

  return (
    <article className="product-card">
      <header>
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `${index}-product-img` }
        />
      </header>
      <main>
        <strong data-testid={ `${index}-product-name` }>{name}</strong>
        <p data-testid={ `${index}-product-unit-price` }>{priceFormat}</p>
        <div>
          <button
            type="button"
            onClick={ () => removeFromCart(data) }
            data-testid={ `${index}-removal-button` }
          >
            -
          </button>
          <br />
          <strong data-testid={ `${index}-product-total-value` }>
            {formatedPrice}
          </strong>
          <p data-testid={ `${index}-product-qtd-input` }>{quantity}</p>
          <button
            type="button"
            onClick={ () => addToCart(data) }
            data-testid={ `${index}-product-plus` }
          >
            +
          </button>
        </div>
      </main>
    </article>
  );
}

CheckoutPdtCard.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckoutPdtCard;
