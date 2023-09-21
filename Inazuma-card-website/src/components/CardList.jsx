import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('allcards');  // valeur par défaut
  const [position, setPosition] = useState('All');
  const [element, setElement] = useState('All');
  const [team, setTeam] = useState('All');
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

        const responseData = await response.json();
        let cardarray= responseData;
        console.log(element)
        if (position !== "All"){
          cardarray = (findCardPosition(cardarray, position));
        }
        if (element !== "All"){
          cardarray = (findCardElement(cardarray, element));
        }
        if (team !== "All"){
          cardarray = (findCardTeam(cardarray, team));
        }
        console.log(cardarray)
        setCards(cardarray)
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    fetchCards();
  }, [category,position,element,team]);


  function findCardPosition(array, position) {
    return array.filter(element =>element.position === position);
  }
  function findCardElement(array, element) {
    return array.filter(card =>card.element === element);
  }
  function findCardTeam(array, team) {
    return array.filter(card =>card.team === team);
  }

  const handleAddToDeck = (card) => {
    // Ici, vous faites un appel API pour ajouter la carte au deck
    // et mettez à jour l'état du deck si nécessaire
    console.log(`Adding card with id ${card.cardid} to the deck...`);

    // Pour l'instant, c'est un simple log, mais vous devez établir une connexion avec votre API pour réellement ajouter la carte.
  }

  return (
    <div className="container bordered ">
      <div class="bg-primary">Filter:&nbsp;
      <select class="bg-grey" value={position} onChange={e => setPosition(e.target.value)}>
        <option value="All">All</option>
        <option value="FW">Forward</option>
        <option value="MF">Midfielder</option>
        <option value="DF">Defender</option>
      </select>
      <select class="bg-grey" value={element} onChange={e => setElement(e.target.value)}>
        <option value="All">All</option>
        <option value="Fire">Fire</option>
        <option value="Teamwork">Teamwork</option>
        <option value="Tactic">Tactic</option>
        <option value="Speed">Speed</option>
        <option value="None">None</option>
      </select>
      <select class="bg-grey" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="allcards">All</option>
        <option value="starting_cards">Starting</option>
        <option value="reserve_cards">Reserve</option>
        <option value="technique_cards">Technique</option>
        <option value="goal_cards">Goal</option>
      </select>
      <select class="bg-grey" value={team} onChange={e => setTeam(e.target.value)}>
        <option value="All">All</option>
        <option value="Raimon">Raimon</option>
        <option value="Royal Academy">Royal Academy</option>
        <option value="Inazuma KFC">Inazuma KFC</option>
        <option value="Wild">Wild</option>
      </select>
      
      </div>
    <div class="card-display">
      {cards.map((data) => (
      <div className="card-box " key={"card" + data.cardid}>
        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        <div className="card-details">
          <h4>{data.name}</h4>  {/* Affichage du nom de la carte */}
          <p>Type: {data.cardtype}</p>  {/* Affichage du type de la carte */}
        </div>
        <button onClick={() => handleAddToDeck(data)}>Ajouter au deck</button>
      </div>
    ))}
  </div></div>
  );
}

export default CardList;
