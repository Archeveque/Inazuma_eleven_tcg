import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function Login() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Ajout d'un nouvel état

  const handleLogin = async (event) => {
    event.preventDefault();

    // fetch request for authentication
    try {
      const response = await fetch('https://inazuma-tcg-api-879bee6c850b.herokuapp.com/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);

        setUser({
          isLoggedIn: true,
        });
        setIsAuthenticated(true);  // Modification de l'état lors d'une authentification réussie
      } else {
        setError('Incorrect credentials');
      }
    } catch (error) {
      setError('An error occured');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/Catalog" />;  // Redirection vers le catalogue si l'authentification est réussie
  }

  return (
    <div class="login bg-grey bordered centered shadowed">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <button class="bg-primary" type="submit">Sign In</button>
      </form>
      <br></br>
      <a href="/register">Sign up now</a>
    </div>
  );
}

export default Login;
