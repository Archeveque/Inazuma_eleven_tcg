import React, { useEffect, useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('starting');  // valeur par défaut
  const API_URL = "https://inazuma-tcg-api-879bee6c850b.herokuapp.com";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_URL}/allcards/category/${category}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        const responseData = await response.json();
        setCards(responseData);
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    fetchCards();
  }, [category]);

  const handleAddToDeck = (card) => {
    // Ici, vous faites un appel API pour ajouter la carte au deck
    // et mettez à jour l'état du deck si nécessaire
    console.log(`Adding card with id ${card.cardid} to the deck...`);

    // Pour l'instant, c'est un simple log, mais vous devez établir une connexion avec votre API pour réellement ajouter la carte.
  }

  return (
    <div className="card-display container columns8 bordered">
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="starting">Starting</option>
        <option value="reserve">Reserve</option>
        <option value="technique">Technique</option>
        <option value="goal">Goal</option>
      </select>

      {cards.map((data) => (
        <div className="card-box" key={"card" + data.cardid}>
          <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
          <button onClick={() => handleAddToDeck(data)}>Ajouter au deck</button>
        </div>
      ))}
    </div>
  );
}

export default CardList;
