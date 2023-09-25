import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


function CardListDeck(props) {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('allcards');
  const [position, setPosition] = useState('All');
  const [element, setElement] = useState('All');
  const [team, setTeam] = useState('All');
  const [sortby, setSortby] = useState('number');
  const [deck, setDeck] = useState([]);

  let { id } = useParams();
  const API_URL = "https://inazuma-tcg-api-879bee6c850b.herokuapp.com";

  useEffect(() => {
    const fetchDeckCards = async () => {
      try {
        const response = await fetch(`${API_URL}/decks/${id}/cards`);
        if (!response.ok) throw new Error("Failed to fetch deck cards");
        const deckData = await response.json();
        setDeck(deckData);
      } catch (error) {
        console.error("There was an error fetching the deck cards:", error);
      }
    };

    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_URL}/${category}`);
        if (!response.ok) throw new Error("Failed to fetch cards");
        
        let cardarray = await response.json();
        cardarray = cardarray.filter(card => !deck.some(deckCard => deckCard.cardid === card.cardid)); // exclure les cartes déjà dans le deck
        cardarray = filterByCriteria(cardarray, { position, element, team });
        cardarray = sortByCriteria(cardarray, sortby);
        
        setCards(cardarray);
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    fetchDeckCards();
    fetchCards();
  }, [category, position, element, team, sortby, id, deck]);
  
  function sortByCriteria(array, sortby) {
    switch (sortby) {
      case 'number':
        return array.sort((a, b) => (a.cardid > b.cardid) ? 1 : -1);
      case 'sp':
        return array.sort((a, b) => (a.sp > b.sp) ? 1 : -1);
      case 'level':
        return array.sort((a, b) => (a.level > b.level) ? 1 : -1);
      case 'alph':
        return array.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return array;
    }
  }

  function filterByCriteria(array, criteria) {
    if (criteria.position && criteria.position !== "All") {
      array = array.filter(card => card.position === criteria.position);
    }
    if (criteria.element && criteria.element !== "All") {
      array = array.filter(card => card.element === criteria.element);
    }
    if (criteria.team && criteria.team !== "All") {
      array = array.filter(card => card.team === criteria.team);
    }
    return array;
  }

  const handleAddToDeck = async (card) => {
    try {
      const response = await fetch(`${API_URL}/decks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card: {
            id: card.cardid,
            type: card.cardtype,
            deckid: id,
          }
        })
      });
  
      if (response.ok) {
        const newDeck = [...deck, card];
        setDeck(newDeck);
        
        // Remove the card from the available cards list
        const newCards = cards.filter(c => c.cardid !== card.cardid);
        setCards(newCards);
      } else {
        console.error('Failed to add card to deck');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
};


  const [enlargedImage, setEnlargedImage] = useState(null);
  const handleImageClick = imageUrl => setEnlargedImage(imageUrl);
  const closeEnlargedImage = () => setEnlargedImage(null);    
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
        <img width="100%" src={data.picture} title={data.name} alt={data.name} onClick={() => handleImageClick(data.picture)} ></img>
        {deck.some(deckCard => deckCard.cardid === data.cardid) ? 
          <span>In the deck</span> : 
          <button onClick={() => handleAddToDeck(data)}>Add to deck</button>}
      </div>
    ))}

    

  </div>
  {enlargedImage && (
    <div className="modal" onClick={closeEnlargedImage}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeEnlargedImage}>&times;</span>
        <img className="modal-content" src={enlargedImage} />
      </div>
    </div>
  )}
  </div>
  );
}

export default CardListDeck;
