import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { AdminSidebar, AdminCard } from '../../components';
import { getItem } from '../../services/localStorage';
import api from '../../services/api';

function AdminHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.fetchOrders(getItem('user').token);
      setProducts(response);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1>Admin home</h1>
      <AdminSidebar />
      <section>
        { isLoading
          ? <h1>Carregando</h1>
          : products.map((product) => <AdminCard key={ product.id } data={ product } />)}
      </section>
    </div>
  );
}

export default AdminHome;
