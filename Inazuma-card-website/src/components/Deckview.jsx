import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom"

function Deckview() {
const [decks, setDecks] = useState([]);
let { id } = useParams();
useEffect(() => {
  const fetchDecks = () => {
    const decklink = 'https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks/'+id
    fetch(decklink, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        responseData.sort((a, b) => (a.cardid > b.cardid) ? 1 : -1)
        console.log(responseData)
        setDecks(responseData);
      });
    }
    fetchDecks()
}, []);

return (
<div class="container columns8 bordered">
{decks.map((data) => (
    <div width="200px"  class="card-box card-display">
      <div>
        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        <p>{data.name} {data.cardid}</p>
        </div>
    </div>
  ))}
</div>
)
}

export default Deckview
