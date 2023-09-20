import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Deckview() {
    const [decks, setDecks] = useState([]);
    let { id } = useParams();
    const API_URL = 'https://inazuma-tcg-api-879bee6c850b.herokuapp.com';

    const fetchDecks = () => {
        const decklink = `${API_URL}/decks/${id}`;
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

    const handleRemoveFromDeck = (cardId) => {
        // Update the state by removing the card from the deck view
        setDecks(prevDecks => prevDecks.filter(card => card.cardid !== cardId));
    };

    useEffect(() => {
        fetchDecks();
    }, []);

    function findCardType(array, title) {
        return array.filter(element => element.cardtype === title).length;
    }

    function findCardPosition(array, title, position) {
        return array.filter(element => element.cardtype === title && element.position === position).length;
    }

    return (
        <div className="container bordered">
            <div className="gradient-box">
                <p>Deckbuilding</p>
            </div>
            <table className="bg-grey bordered" width="100%">
                <tbody>
                    <tr>
                        <td> </td><td> Deck size : {decks.length-findCardType(decks,"starting")}/30 </td>
                    </tr>
                    <tr>
                        <td></td><td>Reserve: {findCardType(decks,"reserve")}</td>
                    </tr>
                    <tr>
                        <td>Starting deck: {findCardType(decks,"starting")}/10</td>
                        <td>
                            FW:{findCardPosition(decks,"reserve","FW")} 
                            MF:{findCardPosition(decks,"reserve","MF")} 
                            DF:{findCardPosition(decks,"reserve","DF")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            FW:{findCardPosition(decks,"starting","FW")} 
                            MF:{findCardPosition(decks,"starting","MF")} 
                            DF:{findCardPosition(decks,"starting","DF")}
                        </td>
                        <td>Technique: {findCardType(decks,"technique")}</td>
                    </tr>
                </tbody>
            </table>
            <div className="card-display">

                {decks.map((data, index) => (
                    <div className="card-box " key={data.id}>
                        <div>
                            <img width="100%" src={data.picture} title={data.name} alt={data.name} />
                            <div className="card-details">
                                <h4>{data.name}</h4>
                                <p>Type: {data.cardtype}</p>
                            </div>
                            <button onClick={() => handleRemoveFromDeck(data.cardid)}>Retirer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Deckview;