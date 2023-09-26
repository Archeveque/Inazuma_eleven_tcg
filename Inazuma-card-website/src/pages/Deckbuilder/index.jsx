// import Deckview from '../../components/Deckview';
// import CardListDeck from '../../components/CardListDeck';
import DeckManager from '../../components/DeckManager';

const Decks = () => {
  return (

    <table>
        <tr>
          <td  width="110%" class="align-top">
            <DeckManager />
          </td>
          {/* <td  width="45%" class="align-end" >
            <Deckview />
          </td> */}
        </tr>
    </table>


  )
}

export default Decks;
