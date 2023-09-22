import React, { useEffect, useState } from 'react';
import deckicon from '../assets/deckbox480.png';
import Cookies from 'js-cookie';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState([]);
  const [error, setError] = useState('');


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

    // Post request for new deck
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
  const handledeletedeck = async (event) => {
    event.preventDefault();

    // Post request for new deck
    try {
      const response = await fetch('https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks/22', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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


return (
  <div class="container bordered align-top">
    {decks.map((data) => (
      <div class="deck-display" key={data.id}>
        <img src={deckicon} width="190px" title={data.name} alt={data.name}></img>
        <a class="btn bg-secondary" href={"/deckbuilder/" +data.id}>edit Deck </a>
        <p>{data.name + data.id}</p>
        <button class="bg-primary" onClick={handledeletedeck}>delete</button>
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
  )
}

export default DeckList