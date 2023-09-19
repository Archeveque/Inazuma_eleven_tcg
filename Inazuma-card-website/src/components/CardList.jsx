import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = () => {

    fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/allcards", {
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
    <div class="card-display container columns8 bordered">
      {cards.map((data) => (
        <div class="card-box" key={"card" + data.cardid}>
          <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        </div>
      ))}
    </div>
  );
}

export default CardList;
