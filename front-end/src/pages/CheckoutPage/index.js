import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../../context';
import { ClientMenu, CheckoutPdtCard } from '../../components';
import api from '../../services/api';

function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [purchaseSucceeded, setPurchaseSucceeded] = useState('');

  const { cart, totalPrice } = useContext(Context);

  const history = useHistory();

  const formatedTotalPrice = `R$ ${totalPrice.replace(/\./g, ',')}`;

  const purchaseFinished = () => {
    const ALERT_TIME = 4000;
    setPurchaseSucceeded('Compra realizada com sucesso!');
    setTimeout(() => {
      history.push('/products');
    }, ALERT_TIME);
  };

  const handlePurchFinish = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'))
      || { name: null, role: null };
    try {
      const purchRes = await api.registerPurchase({ cart, houseNumber, street, token });
      return purchRes.error
        ? alert(purchRes.message)
        : purchaseFinished();
    } catch (err) {
      alert('Alguma coisa deu errado');
    }
  };

  useEffect(() => {
    if (cart.length > 0) setIsLoading(false);
  }, [cart]);

  return isLoading ? <h1>Carregando</h1> : (
    <>
      <ClientMenu><p data-testid="top-title">TryBeer</p></ClientMenu>
      <section>
        {cart.length === 0 ? <h2>Não há produtos no carrinho</h2>
          : cart.map((prd, i) => (<CheckoutPdtCard
            key={ prd.id }
            data={ prd }
            index={ i }
          />))}
        <div
          data-testid="order-total-value"
        >
          { formatedTotalPrice }
        </div>
        <label htmlFor="street">
          Endereço
          <input
            id="street"
            data-testid="checkout-street-input"
            placeholder="Av. Atlantica"
            type="text"
            onChange={ ({ target }) => setStreet(target.value) }
            value={ street }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            id="number"
            data-testid="checkout-house-number-input"
            placeholder="34"
            type="text"
            onChange={ ({ target }) => setHouseNumber(target.value) }
            value={ houseNumber }
          />
        </label>
        <button
          data-testid="checkout-finish-btn"
          type="button"
          disabled={ street === '' || houseNumber === '' }
          onClick={ (event) => handlePurchFinish(event) }
        >
          Finalizar pedido
        </button>
        <div>{ purchaseSucceeded }</div>
      </section>
    </>
  );
}

export default Checkout;
