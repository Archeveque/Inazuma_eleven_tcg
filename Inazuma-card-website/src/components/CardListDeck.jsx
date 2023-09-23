import React, { useEffect, useState } from 'react';

function CardListDeck(props) {
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('allcards');
    const [position, setPosition] = useState('All');
    const [element, setElement] = useState('All');
    const [team, setTeam] = useState('All');
    const [sortby, setSortby] = useState('number');
    const API_URL = "https://inazuma-tcg-api-879bee6c850b.herokuapp.com";

    console.log("deckId:", props.deckId);

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
                let cardarray = responseData;
                if (position !== "All") {
                    cardarray = (findCardPosition(cardarray, position));
                }
                if (element !== "All") {
                    cardarray = (findCardElement(cardarray, element));
                }
                if (team !== "All") {
                    cardarray = (findCardTeam(cardarray, team));
                }
                cardarray = SortingCards(cardarray, sortby);
                setCards(cardarray);
            } catch (error) {
                console.error("There was an error fetching the cards:", error);
            }
        };

        fetchCards();
    }, [category, position, element, team, sortby]);

    function SortingCards(array, sortby) {
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

    function findCardPosition(array, position) {
        return array.filter(element => element.position === position);
    }

    function findCardElement(array, element) {
        return array.filter(card => card.element === element);
    }

    function findCardTeam(array, team) {
        return array.filter(card => card.team === team);
    }

    const handleAddToDeck = async (card) => {
        if (!props.deckId) {
            console.error('deckId is undefined');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/decks/${props.deckId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardId: card.cardid
                }),
            });

            if (response.ok) {
                console.log(`Card with id ${card.cardid} added to deck ${props.deckId}`);
            } else {
                console.error('Failed to add card to deck');
            }
        } catch (error) {
            console.error("There was an error adding the card to the deck:", error);
        }
    }

    return (
        <div className="container bordered ">
            <div className="bg-primary">
                Sort by:&nbsp;
                <select className="bg-grey" value={sortby} onChange={e => setSortby(e.target.value)}>
                    <option value="number">number</option>
                    <option value="sp">sp</option>
                    <option value="level">level</option>
                    <option value="alph">Alphabetical</option>
                </select>
                {/* ... Les autres sélecteurs ... */}
            </div>
            <div className="card-display">
                {cards.map((data) => (
                    <div className="card-box" key={"card" + data.cardid}>
                        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
                        <p>Card ID: {data.cardid}</p>
                        <button onClick={() => handleAddToDeck(data)}>Add to deck</button>
                    </div>
                ))}
            </div>
            <button onClick={props.exitEditing}>Return to Deck List</button>
        </div>
    );
}

export default CardListDeck;
