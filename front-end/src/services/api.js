import axios from 'axios';

const endpoint = 'http://localhost:3001';
const headers = { 'Content-Type': 'application/json' };
const applicationJson = 'application/json';

async function getProducts() {
  const response = await (await fetch(`${endpoint}/products`)).json();
  return response;
}

async function registerUser(data) {
  const response = await (await fetch(`${endpoint}/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })).json();

  return response;
}

async function loginUser(email, password) {
  const options = {
    method: 'POST',
    url: `${endpoint}/login`,
    headers,
    data: { email, password },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

const registerPurchase = async ({ cart, houseNumber, street, token }) => {
  const options = {
    method: 'POST',
    url: `${endpoint}/checkout`,
    headers: {
      'Content-Type': applicationJson,
      Authorization: token,
    },
    data: { houseNumber, street, cart },
  };
  try {
    const purchRes = await axios.request(options);
    return purchRes.data;
  } catch (error) {
    return error.response.data;
  }
};

async function updateUser(name, token) {
  const options = {
    method: 'PUT',
    url: `${endpoint}/profile`,
    headers: {
      'Content-Type': applicationJson,
      Authorization: token,
    },
    data: { name },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

async function getAllOrders(token) {
  const options = {
    method: 'GET',
    url: `${endpoint}/orders`,
    headers: {
      Authorization: token,
    },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}

async function getOrderDetailsById(token, id) {
  const options = {
    method: 'GET',
    url: `${endpoint}/orders/${id}`,
    headers: {
      Authorization: token,
    },
  };

  return axios.request(options)
    .then((response) => response.data).catch((error) => error.response.data);
}
async function fetchOrders(token) {
  const response = await (await fetch(`${endpoint}/admin/orders`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: token,
    },
  })).json();

  return response;
}

async function fetchOrderById(token, id) {
  const response = await (await fetch(`${endpoint}/admin/orders/${id}`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: token,
    },
  })).json();

  return response;
}

async function updateStatusById(token, id) {
  const response = await (await fetch(`${endpoint}/admin/orders/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      Authorization: token,
    },
  })).json();

  return response;
}

export default {
  getProducts,
  loginUser,
  registerUser,
  registerPurchase,
  updateUser,
  getAllOrders,
  getOrderDetailsById,
  fetchOrders,
  fetchOrderById,
  updateStatusById,
};
