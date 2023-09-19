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
        });
    }

    useEffect(() => {
        fetchDecks();
    }, []);

    const handleDelete = (idcard, cardType) => {
        // Construisez l'URL en fonction du type de carte
        let deleteUrl = `https://inazuma-tcg-api-879bee6c850b.herokuapp.com/decks/${id}/${cardType}/${idcard}`;

        fetch(deleteUrl, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetchDecks(); 
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="container columns8 bordered">
            {decks.map((data) => (
                <div width="200px" className="card-box card-display" key={data.id}>
                    <div>
                        <img width="100%" src={data.picture} title={data.name} alt={data.name}></img>
                        <p>{data.name} {data.cardid}</p>
                        {/* Notez comment j'ai ajouté data.cardType à l'appel handleDelete */}
                        <button onClick={() => handleDelete(data.id, data.cardType)}>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Deckview;
