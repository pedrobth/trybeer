import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AdminSidebar, AdminCardDetails } from '../../components';
import api from '../../services/api';
import { getItem } from '../../services/localStorage';

function AdminDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await api.fetchOrderById(getItem('user').token, id);
      setProducts(response);
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (!isLoading) setStatus(products[0].status);
  }, [isLoading, products]);

  return (
    <>
      <header>
        <h1>Admin Details</h1>
        <AdminSidebar />
        { isLoading
        || (
          <h3>
            {'Pedido: '}
            <span data-testid="order-number">
              {`Pedido ${products[0].sale_id}`}
            </span>
            {' - '}
            <span data-testid="order-status">
              {status}
            </span>
          </h3>
        )}
      </header>
      <section>
        { isLoading
          ? <h1>Carregando</h1>
          : products.map((product, index) => (
            <AdminCardDetails
              key={ product.id }
              data={ product }
              index={ index }
            />
          ))}
      </section>
      <footer>
        <div data-testid="order-total-value">
          {isLoading ? 'R$ 0,00' : `R$ ${products[0].total_price.replace(/\./g, ',')}`}
        </div>
        {
          status !== 'Entregue'
        && (
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ () => {
              (async () => {
              // const response = await api.updateStatusById(getItem('user').token, id);
                await api.updateStatusById(getItem('user').token, id);
                // const OK = 200;
                // if (response.status === OK) console.log("ok");
                setStatus('Entregue');
              })();
            } }
          >
            Marcar como entregue
          </button>
        )
        }
      </footer>
    </>
  );
}

export default AdminDetails;
