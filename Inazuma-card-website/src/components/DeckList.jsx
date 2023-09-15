import React, { useEffect, useState } from 'react';
import deckicon from '../assets/deckbox480.png';

function DeckList() {
const [decks, setDecks] = useState([]);

useEffect(() => {
  const fetchDecks = () => {
    fetch("http://localhost:3000/decks", {
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

return (
<div class="container columns8">
{decks.map((data) => (
    <div class="deck-display" key={data.id}>
      <div>
        <img width="100%" src={deckicon} title={data.name} alt={data.name}></img>
            <a class="btn bg-secondary" href={"/deckbuilder/" +data.id}>edit</a>
        <p>{data.name} {data.id}</p>
        </div>
    </div>
  ))}
</div>
)
}

export default DeckList