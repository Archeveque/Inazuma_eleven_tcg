import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

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
    <button class="bg-secondary" onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;

