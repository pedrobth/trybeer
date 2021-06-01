export const getItem = (name) => JSON.parse(localStorage.getItem(name));

export const saveItem = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const handleLogin = async (data) => saveItem('user', data);
export const handleLogout = () => localStorage.removeItem('user');

export const isAuthenticated = () => {
  if (!localStorage.getItem('user')) return false;
  if (!getItem('user').token) return false;

  return true;
};
