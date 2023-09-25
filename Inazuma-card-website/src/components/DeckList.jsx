import React, { useEffect, useState } from 'react';
import deckicon from '../assets/deckbox480.png';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token && id) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch(`https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks?user_id=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setDecks(responseData);
        } else {
          throw new Error('Failed to fetch decks');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
    };

    if (user.id) {
      fetchDecks();
    }
    
  }, [user.id]);

  const handlenewDeck = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deck: {
            name : name,
            user_id: user.id,
          }
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('Failed to create deck');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const handledeletedeck = async (deckId) => {
    try {
      const response = await fetch(`https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks/${deckId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('Failed to delete deck');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div>
      {user.isLoggedIn ? (
        <div className="container bordered align-top">
          {decks.map((data) => (
            <div className="deck-display" key={data.id}>
              <img src={deckicon} width="190px" title={data.name} alt={data.name}></img>
              <a className="btn bg-secondary" href={`/deckbuilder/${data.id}`}>edit Deck </a>
              <p>{data.name + data.id}</p>
              <button className="bg-primary" onClick={() => handledeletedeck(data.id)}>delete</button>
            </div>
          ))}
          {error && <p>{error}</p>}
          <form onSubmit={handlenewDeck}>
            <input
              type="text"
              placeholder="Deck Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br></br>
            <button className="bg-primary" type="submit">Create new deck</button>
          </form>
        </div>
      ) : (
        <div className="container">
          <p>You aren't logged, You need to login to create and edit your decks</p>
          <a className="bg-secondary btn" href="/login">Login</a>
        </div>
      )}
    </div>
  )
}

export default DeckList;
