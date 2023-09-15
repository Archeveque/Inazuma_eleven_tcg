import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = () => {
      const cardarray=[];
      fetch("http://localhost:3000/starting_cards", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          responseData.map((data)  => cardarray.push(data));
        });
        fetch("http://localhost:3000/technique_cards", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            responseData.map((data)  => cardarray.push(data));
          });

    fetch("http://localhost:3000/reserve_cards", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        responseData.map((data)  => cardarray.push(data));
        cardarray.sort((a, b) => (a.cardid > b.cardid) ? 1 : -1)
        console.log(cardarray)
        setCards(cardarray);
      });
    };

    fetchCards();
  }, []);
  

  return (
    <div class="card-display container columns8">
      {cards.map((data) => (
        <div class="card-box" key={"card" + data.cardid}>
          <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        </div>
      ))}
    </div>
  );
}

export default CardList;