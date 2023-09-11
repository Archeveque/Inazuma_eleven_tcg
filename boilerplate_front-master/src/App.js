import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atom';
import Register from './page/register';
import Login from './page/login';
import PostList from './components/PostList';
import CreatePost from './components/CreatePostButton';
import Logout from './components/logout';
import Cookies from 'js-cookie';
import "./App.css";

function App() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  return (
    <div class="bg-dark">
      <h1>Mon application</h1>
      {user.isLoggedIn ? (
        <div>
          <p>Bienvenue, Utilisateur n°{user.id} !</p>
          <PostList />
          <CreatePost />
          <Logout />
        </div>
      ) : (
        <div>
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;

