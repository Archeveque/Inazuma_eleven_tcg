import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atom';
import Cookies from 'js-cookie';

function About() {
    const githubLinks = [
        { name: 'Archeveque', url: 'https://github.com/Archeveque' },
        { name: 'Damicode', url: 'https://github.com/DamiC0de' },
        { name: 'Alexisdpr', url: 'https://github.com/AlexisDpr' },
      ];

return (
    <div className="About">
      <header className="About-header">
        <h1>About us and our site</h1>
        <p>
          Our goal is to create a website that compiles the cards of the collectible card game Inazuma Eleven, a game that has faded into obscurity and has very few traces on the internet. The site also aims to be an advanced deck creation tool.
        </p>
        <p>
          This website was thinking and conceived by Archeveque and developed by Damicode and Alexisdpr.
        </p>
        <p>
          You can find below our GitHub repositories for our various projects throughout The Hacking Project :
        </p>
        <ul>
          <li>
            <a href="https://github.com/Archeveque" target="_blank" rel="noopener noreferrer">Archeveque</a>
          </li>
          <li>
            <a href="https://github.com/DamiC0de" target="_blank" rel="noopener noreferrer">Damicode</a>
          </li>
          <li>
            <a href="https://github.com/AlexisDpr" target="_blank" rel="noopener noreferrer">Alexisdpr</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default About;