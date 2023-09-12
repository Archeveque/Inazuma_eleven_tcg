import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAtom } from 'jotai';
import { userAtom } from './atom';
import Register from './components/register';
import Login from './components/login';
import PostList from './components/PostList';
import CardList from './components/CardList';
import CreatePost from './components/CreatePostButton';
import Logout from './components/logout';
import Cookies from 'js-cookie';
import Navbar from './components/navbar'
import "./App.css";
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Deckbuilder from './pages/Deckbuilder';
import Decks from './pages/Decks';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    <BrowserRouter>
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Deckbuilder" element={<Deckbuilder />} />
          <Route path="/Decks" element={<Decks />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      {user.isLoggedIn ? (
        <div>
          <p>Bienvenue, Utilisateur n°{user.id} !</p>
          <PostList />
          <CreatePost />
          <Logout />
        </div>
      ) : (
        <div>
          <p>you aren't loged</p>
        </div>
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;

