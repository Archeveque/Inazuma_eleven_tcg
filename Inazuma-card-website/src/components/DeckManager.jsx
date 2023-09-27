import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


function DeckManager() {
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('allcards'); 
    const [position, setPosition] = useState('All');
    const [element, setElement] = useState('All');
    const [team, setTeam] = useState('All');
    const [sortby, setSortby] = useState('number');
    const [deck, setDeck] = useState([]);
    const [decks, setDecks] = useState([]);
    const [enlargedImage, setEnlargedImage] = useState(null);
    let { id } = useParams();
    const API_URL = "https://inazuma-tcg-api-879bee6c850b.herokuapp.com";
    
    useEffect(() => {
        fetchCards();
        fetchDecks();
    }, [category, position, element, team, sortby, deck]);
    const [deckCards, setDeckCards] = useState([]);
    
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
            cardarray = filterCards(cardarray);
            cardarray = sortCards(cardarray);
            setCards(cardarray);

        } catch (error) {
            console.error("There was an error fetching the cards:", error);
        }
    };

    const fetchDecks = async () => {
        try {
            const response = await fetch(`${API_URL}/decks/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch decks");
            }
    
            const responseData = await response.json();
            setDecks(responseData);
            let cardarray = filterDeckCards(responseData);
            setDeckCards(cardarray);  // Modification pour mettre à jour deckCards au lieu de cards.
    
        } catch (error) {
            console.error("There was an error fetching the decks:", error);
        }
    };

    const filterCards = (array) => {
        if (position !== "All") array = array.filter(card => card.position === position);
        if (element !== "All") array = array.filter(card => card.element === element);
        if (team !== "All") array = array.filter(card => card.team === team);
        return array;
    };

    const sortCards = (array) => {
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
    };

    const filterDeckCards = (array) => {
        if (category !== "allcards") {
            return array.filter(element => element.cardtype === category);
        }
        return array;
    };
    

    const handleAddToDeck = async (card) => {
        console.log(`Adding card with id ${card.cardid} to deck#${id}...`);

        try {
          const response = await fetch(`${API_URL}/decks/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card: {
                id:card.cardid,
                type:card.cardtype,
                deckid: id,
              }
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            setDeck(prevDeck => [...prevDeck, card]);
            fetchDecks();
          } else {
            console.log('Error adding card to deck');
          }
        } catch (error) {
          console.log('An error occurred while adding the card to the deck:', error);
        }
    };

    const handleRemoveFromDeck = async (card) => {
        console.log(`Removing card with id ${card.cardid} from deck#${id}...`);
    
        try {
            const response = await fetch(`${API_URL}/decks/${id}/destroycard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    card: {
                        id: card.cardid,
                        type: card.cardtype,
                        deckid: id,
                    }
                }),
            });
    
            if (!response.ok) {
                const responseData = await response.json();
                console.error("Error response from server:", responseData);
                throw new Error("Failed to remove card from deck");
            }
    
            fetchDecks();
        } catch (error) {
            console.error("Error removing card from deck:", error);
        }
    };
    

    const handleImageClick = (imageUrl) => {
        setEnlargedImage(imageUrl);
    };
    
    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    const findCardTypeNum = (array, type) => {
        return array.filter(card => card.cardtype === type).length;
    };
    
    const findCardPosition = (array, type, position) => {
        return array.filter(card => card.cardtype === type && card.position === position).length;
    };
    
    // Drag ann drop settings





    
    
    // Merged JSX return
    return (
        <div className="deck-manager-container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
    
            {/* Cartes disponibles */}
            <div className="container bordered" style={{ width: "53%", marginRight: "5px" }}>
                <div className="bg-primary text-right">
                    Sort by:&nbsp;
                    <select className="bg-grey" value={sortby} onChange={e => setSortby(e.target.value)}>
                        <option value="number">number</option>
                        <option value="sp">sp</option>
                        <option value="level">level</option>
                        <option value="alph">Alphabetical</option>
                    </select>
                    <br />
                    Filter:&nbsp;
                    position:
                    <select className="bg-grey" value={position} onChange={e => setPosition(e.target.value)}>
                        <option value="All">All</option>
                        <option value="FW">Forward</option>
                        <option value="MF">Midfielder</option>
                        <option value="DF">Defender</option>
                    </select>
                    &nbsp;element:
                    <select className="bg-grey" value={element} onChange={e => setElement(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Fire">Fire</option>
                        <option value="Teamwork">Teamwork</option>
                        <option value="Tactic">Tactic</option>
                        <option value="Speed">Speed</option>
                        <option value="None">None</option>
                    </select>
                    &nbsp;Type:
                    <select className="bg-grey" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="allcards">All</option>
                        <option value="starting_cards">Starting</option>
                        <option value="reserve_cards">Reserve</option>
                        <option value="technique_cards">Technique</option>
                        <option value="goal_cards">Goal</option>
                    </select>
                    &nbsp;Team:
                    <select className="bg-grey" value={team} onChange={e => setTeam(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Raimon">Raimon</option>
                        <option value="Royal Academy">Royal</option>
                        <option value="Inazuma KFC">KFC</option>
                        <option value="Wild">Wild</option>
                    </select>
                </div>
    
                <div className="card-display">
                    {cards.map((data) => (
                        <div className="card-box" key={"card" + data.cardid}>
                            <img width="100%" src={data.picture} title={data.name} alt={data.name} onClick={() => handleImageClick(data.picture)}></img>
                            <button onClick={() => handleAddToDeck(data)}>Add to deck</button>
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
    
            {/* DeckBuilding */}
            <div className="container bordered lign-end" style={{ width: "38%" }}>
                <div className="gradient-box">
                    <p>Deckbuilding</p>
                </div>
                <table className="bg-grey bordered" width="100%">
                    <tbody>
                        <tr>
                            <td></td><td> Deck size : {findCardTypeNum(decks,"reserve") + findCardTypeNum(decks, "technique")}/30 </td>
                        </tr>
                        <tr>
                            <td>Goalkeeper: {findCardTypeNum(decks,"goal")}/1,</td><td>Reserve: {findCardTypeNum(decks, "reserve")}</td>
                        </tr>
                        <tr>
                            <td>Starting deck: {findCardTypeNum(decks, "starting")}/10</td>
                            <td>
                                FW:{findCardPosition(decks, "reserve", "FW")}
                                MF:{findCardPosition(decks, "reserve", "MF")}
                                DF:{findCardPosition(decks, "reserve", "DF")}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                FW:{findCardPosition(decks, "starting", "FW")}
                                MF:{findCardPosition(decks, "starting", "MF")}
                                DF:{findCardPosition(decks, "starting", "DF")}
                            </td>
                            <td>Technique: {findCardTypeNum(decks, "technique")}</td>
                        </tr>
                    </tbody>
                </table>
                <select className="gradient-box enlarge" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="allcards">All</option>
                    <option value="starting">Starting</option>
                    <option value="reserve">Reserve</option>
                    <option value="technique">Technique</option>
                    <option value="goal">Goal</option>
                </select>
    
                <div className="card-display">
                    {deckCards.map((data, index) => (
                        <div className="card-box-deck" key={index}>
                            <img width="100%" src={data.picture} title={data.name} alt={data.name} onClick={() => handleImageClick(data.picture)} />
                            <button onClick={() => handleRemoveFromDeck(data)}>Remove</button>
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
    
        </div>
    )
    
}

export default DeckManager;
