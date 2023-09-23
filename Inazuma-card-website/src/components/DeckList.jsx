import React, { useEffect, useState } from 'react';
import deckicon from '../assets/deckbox480.png';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import CardListDeck from './CardListDeck';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token) {
      setUser(prevUser => ({
        ...prevUser,
        id: id,
        isLoggedIn: true,
        token: token,
      }));
    }
  }, [setUser]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch decks");

        const responseData = await response.json();
        setDecks(responseData);
      } catch (error) {
        console.error("There was an error fetching the decks:", error);
      }
    };

    fetchDecks();
  }, []);

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
            name : name
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

  const handleDeleteDeck = async (deckId) => {
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

  const handleEditDeck = (deckId) => {
    setSelectedDeckId(deckId);
  }

  const exitEditing = () => {
    setSelectedDeckId(null);
  }

  return (
    <div>
    {user.isLoggedIn ? (
      <div className="container bordered align-top">
        {selectedDeckId ? (
          <CardListDeck deckId={selectedDeckId} exitEditing={exitEditing} />
        ) : (
          <div>
            {decks.map((data) => (
              <div className="deck-display" key={data.id}>
                <img src={deckicon} width="190px" title={data.name} alt={data.name}></img>
                <button className="btn bg-secondary" onClick={() => handleEditDeck(data.id)}>Edit Deck</button>
                <p>{data.name + data.id}</p>
                <button className="bg-primary" onClick={() => handleDeleteDeck(data.id)}>Delete</button>
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
              <br />
              <button className="bg-primary" type="submit">Create new deck</button>
            </form>
          </div>
        )}
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
