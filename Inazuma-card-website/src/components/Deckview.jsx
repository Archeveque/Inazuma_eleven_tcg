import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Deckview() {
    const [decks, setDecks] = useState([]);
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('All');
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
            let cardarray = responseData;
            if (category !== "All") {
                cardarray = findCardType(cardarray, category);
            }
            console.log(cardarray);
            setCards(cardarray);
        })
        .catch(error => {
            console.error("There was an error fetching the data:", error);
        });
    }

    const handleRemoveFromDeck = async (card) => {
        console.log(`Removing card with id ${card.cardid} from deck#${id}...`);
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
        
        fetchDecks();
    }

    useEffect(() => {
        fetchDecks();
    }, [category]);

    // filters //
    function findCardTypeNum(array, title) {
        return array.filter(element => element.cardtype === title).length;
    }
    function findCardType(array, title) {
        console.log( array.filter(element => element.cardtype === title));
        return array.filter(element => element.cardtype === title);
    }

    function findCardPosition(array, title, position) {
        return array.filter(element => element.cardtype === title && element.position === position).length;
    }
    const [enlargedImage, setEnlargedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
      setEnlargedImage(imageUrl);
    };
    
    const closeEnlargedImage = () => {
      setEnlargedImage(null);
    };
    

    return (
        <div className="container bordered  lign-end">
            <div className="gradient-box">
                <p>Deckbuilding</p>
            </div>
            <table className="bg-grey bordered" width="100%">
                <tbody>
                    <tr>
                        <td> </td><td> Deck size : {decks.length-findCardTypeNum(decks,"starting")}/30 </td>
                    </tr>
                    <tr>
                        <td></td><td>Reserve: {findCardTypeNum(decks,"reserve")}</td>
                    </tr>
                    <tr>
                        <td>Starting deck: {findCardTypeNum(decks,"starting")}/10</td>
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
                        <td>Technique: {findCardTypeNum(decks,"technique")}</td>
                    </tr>
                </tbody>
            </table>
            <select class="bg-grey" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="starting">Starting</option>
                <option value="reserve">Reserve</option>
                <option value="technique">Technique</option>
                <option value="goal">Goal</option>
      </select>
        
            <div className="card-display">

                {cards.map((data, index) => (
                    <div className="card-box-deck " key={index}>
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
        
    )
}


export default Deckview;