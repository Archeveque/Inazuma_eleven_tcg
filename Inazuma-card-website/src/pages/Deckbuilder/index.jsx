import Deckview from '../../components/Deckview';
import CardListDeck from '../../components/CardListDeck';

const Decks = () => {
  return (

    <table>
        <tr>
          <td  width="95%" class="align-top">
            <CardListDeck />
          </td>
          <td  width="45%" class="align-end" >
            <Deckview />
          </td>
        </tr>
    </table>


  )
}

export default Decks;
