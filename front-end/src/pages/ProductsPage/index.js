import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ProductCard, ClientMenu } from '../../components';

import api from '../../services/api';
import { Context } from '../../context';

function Products({ history }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { cart, totalPrice } = useContext(Context);

  // const { cart } = useContext(Context);

  const priceFormat = `R$ ${totalPrice.replace(/\./g, ',')}`;

  useEffect(() => {
    (async () => {
      const response = await api.getProducts();
      setProducts(response);
      setIsLoading(false);
    })();
  }, []);

  // useEffect(() => {
  //   setTotalPrice(cart
  //     .reduce((acc, { price, quantity }) => acc + (price * quantity), 0)
  //     .toFixed(2));
  // }, [cart]);

  return isLoading ? <h1>Carregando</h1> : (
    <>
      <ClientMenu><p data-testid="top-title">TryBeer</p></ClientMenu>
      <section>
        {products.map((product) => <ProductCard key={ product.id } data={ product } />)}
      </section>
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ cart.length === 0 }
        onClick={ () => history.push('/checkout') }
      >
        <p>Ver Carrinho</p>
        <p data-testid="checkout-bottom-btn-value">{ priceFormat }</p>
      </button>

    </>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Products;
