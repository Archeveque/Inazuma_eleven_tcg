import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atom';
import Cookies from 'js-cookie';

function Home  () {
    return (
    <div class="container">
       <h1>Welcome to The Inazuma Elven TCG Website</h1>
       <br></br>
       <p></p>
    </div>
    )
}

export default Home;