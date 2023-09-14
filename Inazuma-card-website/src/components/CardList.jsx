import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = () => {
      fetch("http://localhost:3000/starting_cards", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setCards(responseData);
        });
    };

    fetchCards();
  }, []);
  

  return (
    <div class="card-display container columns8">
      {cards.map((data) => (
        <div class="card-box" key={data.id}>
          <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        </div>
      ))}
    </div>
  );
}

export default CardList;