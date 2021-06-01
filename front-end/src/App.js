import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context';

import ProtectedRoute from './ProtectedRoute';
import {
  LoginPage,
  ProductsPage,
  RegisterPage,
  CheckoutPage,
  AdminHome,
  AdminDetails,
  Profile,
  ProfileAdmin,
  AllOrdersPage,
  OrderDetails,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <ProtectedRoute>
            <Route path="/products" component={ ProductsPage } />
            <Route path="/checkout" component={ CheckoutPage } />
            <Route path="/profile" component={ Profile } />
            <Route path="/admin/profile" component={ ProfileAdmin } />
            <Route
              path="/orders/:id"
              render={ (props) => <OrderDetails { ...props } /> }
            />
            <Route path="/orders" component={ AllOrdersPage } />
            <Route path="/admin/orders/:id" component={ AdminDetails } />
            <Route path="/admin/orders" component={ AdminHome } />

          </ProtectedRoute>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
