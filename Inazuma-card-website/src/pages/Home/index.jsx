import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atom';
import Cookies from 'js-cookie';

function Home  () {
    return (
        <div>
        <h1>Welcome to the Inazuma Eleven Card Game</h1>
        <p>
        Inazuma Eleven is the ultimate source for everything related to card decks in the Inazuma Eleven game. Whether you are a beginner or an experienced player, you will find all the information you need here to create strategic decks and improve your skills in matches.
        </p>
        <br></br>
        <p>
        Explore our catalog, check out the different cards, join the community, and discover everything there is to know about cards and winning strategies in Inazuma Eleven.
        </p>
        
        <ul className="tabs">
        <li>
        <a href="/catalog">Catalog</a>
        </li>
        <li>
        <a href="/decks">Decks</a>
        </li>
        <li>
        <a href="/about">About Us</a>
        </li>
        </ul>
        </div>
        
        );
        };
        
        export default Home;
      