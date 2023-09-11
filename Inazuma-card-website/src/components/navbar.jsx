import { useEffect } from 'react';
import logo from '../assets/inazumalogo.gif';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Cookies from 'js-cookie';
import Logout from '../components/logout';

const Navbar = () => {
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
    <nav class="bg-primary shadow">
      <div>
        <img class="mainlogo" src={logo}></img>
      </div>

      <div class="alignrow">
        <a href="/">Home</a>
        <a href="/Catalog">Catalog</a>
        <a href="/Deck">Decks</a>
        <a href="/About">About</a>
      </div>

      <div>
        {user.isLoggedIn ? (
          <div>
            User n°{user.id}
            <Logout />
          </div>
        ) : (
          <div>
            <button class="bg-secondary">Login</button>
          </div>
        )}
      </div>
    </nav>
)}

export default Navbar;