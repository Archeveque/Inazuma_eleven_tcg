import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Deckview() {
    const [decks, setDecks] = useState([]);
    let { id } = useParams();

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

    useEffect(() => {
        fetchDecks();
    }, []);
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
        <div className=" columns8">
            {decks.map((data) => (
                <div width="200px" className="card-box card-display" key={data.id}>
                    <div>
                        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
                        <p>{data.name} {data.cardid}</p>
                    </div>
                </div>
            ))}
        </div></div>
    )
}

export default Deckview;
