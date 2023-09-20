import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Deckview() {
    const [decks, setDecks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [availableCards, setAvailableCards] = useState([]);
    let { id } = useParams();
    const API_URL = 'https://inazuma-tcg-api-879bee6c850b.herokuapp.com';

    const fetchDecks = () => {
        const decklink = 'https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks/' + id;
        fetch(decklink, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            responseData.sort((a, b) => (a.cardid > b.cardid) ? 1 : -1);
            setDecks(responseData);
        })
        .catch(error => {
            console.error("There was an error fetching the data:", error);
        });
    }

    const handleRemoveFromDeck = async (cardId) => {
        try {
            const response = await fetch(`${API_URL}/decks/${id}/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to remove the card from the deck");
            }

            // Update the state by removing the deleted card from the deck view
            setDecks(prevDecks => prevDecks.filter(card => card.cardid !== cardId));
        } catch (error) {
            console.error("There was an error removing the card from the deck:", error);
        }
    };
    

    useEffect(() => {
        fetchDecks();
    }, []);
    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        try {
            const response = await fetch(`${API_URL}/cards/category/${category}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cards");
            }
            const cards = await response.json();
            setAvailableCards(cards);
        } catch (error) {
            console.error("There was an error fetching the cards:", error);
        }
    };

    const handleAddCardToDeck = (card) => {
        // Here you can make an API call to add the card to the deck
        // And then update the state
        setDecks(prev => [...prev, card]);
    };

    function findCardType(array, title) {
        const test = array.filter((element) => {
          return ( (element.cardtype === title));  
        })
        return test.length
    }
    function findCardPosition(array, title,position) {
        const test = array.filter((element) => {
            return ( (element.cardtype === title));  
        })
        const getpos = test.filter((element) => {
            return ( (element.position === position));  
        })
        return getpos.length
    }

    return (
        <div class="container bordered">
            <div class="gradient-box">
                <p>Deckbuilding</p>
            </div>
            <table class="bg-grey bordered" width="100%">
                <tr>
                    <td> </td><td> Deck size : {decks.length-findCardType(decks,"starting")}/30 </td>
                </tr>
                <tr><td></td>
                    <td>Reserve: {findCardType(decks,"reserve")}</td>
                </tr>
                <tr><td>Starting deck: {findCardType(decks,"starting")}/10</td>
                    <td>FW:{findCardPosition(decks,"reserve","FW")}&nbsp;
                        MF:{findCardPosition(decks,"reserve","MF")}&nbsp;
                        DF:{findCardPosition(decks,"reserve","DF")}
                    </td>
                    </tr>
                <tr>
                    <td>FW:{findCardPosition(decks,"starting","FW")}&nbsp;
                        MF:{findCardPosition(decks,"starting","MF")}&nbsp;
                        DF:{findCardPosition(decks,"starting","DF")}
                    </td>
                    <td>Technique: {findCardType(decks,"technique")}</td>
                    </tr>
            </table>
            <div className="columns8">
            {decks.map((data) => (
            <div className="card-box card-display" key={data.id}>
                    <div>
                        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
                        <div className="card-details">
                            <h4>{data.name}</h4>  {/* Affichage du nom de la carte */}
                            <p>Type: {data.cardtype}</p>  {/* Affichage du type de la carte */}
                        </div>
                        <button onClick={() => handleRemoveFromDeck(data.cardid)}>Retirer</button> {/* Bouton pour retirer la carte */}
                    </div>
            </div>
            ))}
        </div>
    </div>
    )
}

export default Deckview;