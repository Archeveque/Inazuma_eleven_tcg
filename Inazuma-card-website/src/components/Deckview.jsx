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

    return (
        <div className="container bordered">
            <div className="columns2">
                {/* Left: Available cards based on selected category */}
                <div>
                    <p>Available Cards for {selectedCategory}</p>
                    {availableCards.map(card => (
                        <div key={card.cardid}>
                            <img src={card.picture} alt={card.name} />
                            <p>{card.name}</p>
                            <button onClick={() => handleAddCardToDeck(card)}>Add to Deck</button>
                        </div>
                    ))}
                </div>

                {/* Right: Deck view and category selection */}
                <div>
                    <p>Deckbuilding</p>
                    {/* Category selection */}
                    <div>
                        <button onClick={() => handleCategorySelect('Starting')}>Starting Cards</button>
                        {/* Add more categories as needed */}
                    </div>
                    <div>
                        {decks.map((data) => (
                            <div width="200px" className="card-box card-display" key={data.id}>
                                <div>
                                    <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
                                    <p>{data.name} {data.cardid}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deckview;