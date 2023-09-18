import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = () => {
      const cardarray=[];
      fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/starting_cards", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          responseData.map((data)  => cardarray.push(data));
        });
        fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/technique_cards", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            responseData.map((data)  => cardarray.push(data));
          });

    fetch("https://inazuma-tcg-api-879bee6c850b.herokuapp.com/reserve_cards", {
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
