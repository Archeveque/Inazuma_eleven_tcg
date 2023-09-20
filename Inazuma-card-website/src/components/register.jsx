import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Cookies from 'js-cookie';


function SignupForm() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://inazuma-tcg-api-879bee6c850b.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
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
      } else {
        setError('a Error occured while creating your account');
      }
    } catch (error) {
      setError('a Error occured while creating your account');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create account</h2>
      {error && <p>{error}</p>}
      <div>
        <input
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password Confirmation"
          type="password"
          id="password"
          value={password_confirmation}
          onChange={(e) => setPassword_Confirmation(e.target.value)}
          required
        />
      </div>
      <button class="bg-primary" type="submit">Sign up</button>
    </form>
  );
}

export default SignupForm;
