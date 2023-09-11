import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Cookies from 'js-cookie';

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');

  };

  return (
    <button class="bg-primary" onClick={handleLogout}>Déconnexion</button>
  );
}

export default LogoutButton;

