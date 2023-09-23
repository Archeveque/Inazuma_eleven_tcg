import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('allcards');
  const [position, setPosition] = useState('All');
  const [element, setElement] = useState('All');
  const [team, setTeam] = useState('All');
  const [sortby, setSortby] = useState('number');
  const API_URL = "https://inazuma-tcg-api-879bee6c850b.herokuapp.com";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_URL}/${category}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        let cardarray = await response.json();

        if (position !== "All") cardarray = findCardPosition(cardarray, position);
        if (element !== "All") cardarray = findCardElement(cardarray, element);
        if (team !== "All") cardarray = findCardTeam(cardarray, team);

        cardarray = sortCards(cardarray, sortby);
        setCards(cardarray);

      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    fetchCards();
  }, [category, position, element, team, sortby]);

  const sortCards = (array, sortBy) => {
    switch (sortBy) {
      case 'number':
        return array.sort((a, b) => a.cardid - b.cardid);
      case 'sp':
        return array.sort((a, b) => a.sp - b.sp);
      case 'level':
        return array.sort((a, b) => a.level - b.level);
      case 'alph':
        return array.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return array;
    }
  };

  const findCardPosition = (array, position) => array.filter(card => card.position === position);
  const findCardElement = (array, element) => array.filter(card => card.element === element);
  const findCardTeam = (array, team) => array.filter(card => card.team === team);

  return (
    <div className="container bordered">
      <div className="bg-primary">
        {/* ... Same dropdown filters ... */}
      </div>
      <div className="card-display">
        {cards.map((data) => (
          <div className="card-box" key={"card" + data.cardid}>
            <img width="100%" src={data.picture} title={data.name} alt={data.name} />
            <p>Card ID: {data.cardid}</p>  {/* This line displays the card's ID */}
          </div>
        ))}
      </div>
    </div>
  );
}


export default CardList;
