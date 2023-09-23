import React, { useEffect, useState } from 'react';

function CardListDeck() {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('allcards');  // valeur par défaut
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

        const responseData = await response.json();
        let cardarray= responseData;
        if (position !== "All"){
          cardarray = (findCardPosition(cardarray, position));
        }
        if (element !== "All"){
          cardarray = (findCardElement(cardarray, element));
        }
        if (team !== "All"){
          cardarray = (findCardTeam(cardarray, team));
        }
        cardarray = SortingCards(cardarray,sortby)
        setCards(cardarray)
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    fetchCards();
  }, [category,position,element,team,sortby]);

  function SortingCards(array, sortby){
    switch(sortby){
      case 'number':
         return array.sort((a, b) => (a.cardid > b.cardid) ? 1 : -1);
      case 'sp':
        return array.sort((a, b) => (a.sp > b.sp) ? 1 : -1); 
        case 'level':
          return array.sort((a, b) => (a.level > b.level) ? 1 : -1); 
          case 'alph':
            console.log(array.sort((a, b) => a.name.localeCompare(b.name)))
            return array.sort((a, b) => (a.name.toLowerCase > b.name.toLowerCase) ? 1 : -1); 
    }        
  }
  // filters //
  function findCardPosition(array, position) {
    return array.filter(element =>element.position === position);
  }
  function findCardElement(array, element) {
    return array.filter(card =>card.element === element);
  }
  function findCardTeam(array, team) {
    return array.filter(card =>card.team === team);
  }
  // Adding a card to a deck//
  const handleAddToDeck = (card) => {
    console.log(`Adding card with id ${card.cardid} to the deck...`);

  }
  // removing a card from the deck//

  return (
    <div className="container bordered ">
      <div class="bg-primary">
      Sort by:&nbsp;
      <select class="bg-grey" value={sortby} onChange={e => setSortby(e.target.value)}>
        <option value="number">number</option>
        <option value="sp">sp</option>
        <option value="level">level</option>
        <option value="alph">Alphabetical</option>
      </select>
        Filter:&nbsp;
        position:
      <select class="bg-grey" value={position} onChange={e => setPosition(e.target.value)}>
        <option value="All">All</option>
        <option value="FW">Forward</option>
        <option value="MF">Midfielder</option>
        <option value="DF">Defender</option>
      </select>
      element:
      <select class="bg-grey" value={element} onChange={e => setElement(e.target.value)}>
        <option value="All">All</option>
        <option value="Fire">Fire</option>
        <option value="Teamwork">Teamwork</option>
        <option value="Tactic">Tactic</option>
        <option value="Speed">Speed</option>
        <option value="None">None</option>
      </select>
      Type:
      <select class="bg-grey" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="allcards">All</option>
        <option value="starting_cards">Starting</option>
        <option value="reserve_cards">Reserve</option>
        <option value="technique_cards">Technique</option>
        <option value="goal_cards">Goal</option>
      </select>
      Team:
      <select class="bg-grey" value={team} onChange={e => setTeam(e.target.value)}>
        <option value="All">All</option>
        <option value="Raimon">Raimon</option>
        <option value="Royal Academy">Royal</option>
        <option value="Inazuma KFC">KFC</option>
        <option value="Wild">Wild</option>
      </select>
      
      </div>
    <div class="card-display">
      {cards.map((data) => (
      <div className="card-box " key={"card" + data.cardid}>
        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
        <button onClick={() => handleAddToDeck(data)}>Add too deck</button>
      </div>
    ))}
  </div></div>
  );
}

export default CardListDeck;
