import React, { useEffect, useState } from 'react';
import deckicon from '../assets/deckbox480.png';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState([]);
  const [error, setError] = useState('');
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


  useEffect(() => {
    const fetchDecks = () => {
      fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          setDecks(responseData);
        });
      }
      fetchDecks()
  }, []);
  const handlenewDeck = async (event) => {
    event.preventDefault();

    // Post request for creating a new deck
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
        const data = await response.json();
        window.location.reload(false);
      } else {
        setError('Incorrect credentials');
      }
    } catch (error) {
      setError('An error occured');
    }
  }
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
        window.location.reload(false);
      } else {
        setError('Unable to delete deck');
      }
    } catch (error) {
      setError('An error occurred');
    }
  }
  


return (
  <div>
  {user.isLoggedIn ? (
  <div class="container bordered align-top">
    {decks.map((data) => (
      <div class="deck-display" key={data.id}>
        <img src={deckicon} width="190px" title={data.name} alt={data.name}></img>
        <a class="btn bg-secondary" href={"/deckbuilder/" +data.id}>edit Deck </a>
        <p>{data.name + data.id}</p>
        <button class="bg-primary" onClick={() => handledeletedeck(data.id)}>delete</button>
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
        <button class="bg-primary" type="submit">Create new deck</button>
      </form>
  </div>
  ) : (
    <div class="container">
      <p>You aren't logged, You need to login to create and edit your decks</p>
      <a class="bg-secondary btn" href="/login">Login</a>
    </div>
  )}</div>
  )
}

export default DeckList