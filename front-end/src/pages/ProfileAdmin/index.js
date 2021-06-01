import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function ProfileAdmin() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };
  const history = useHistory();

  useEffect(() => {
    if (!user.name) history.push('/login');
    if (user.role === 'administrator') history.push('/admin/profile');
  }, [history, user, user.name]);

  return (
    <div>
      <h1>Perfil</h1>
      <p data-testid="profile-name">
        Name:
        {user.name}
      </p>
      <p data-testid="profile-email">
        Email:
        {user.email}
      </p>
    </div>
  );
}

export default ProfileAdmin;
