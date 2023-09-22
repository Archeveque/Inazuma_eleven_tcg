import Deckview from '../../components/Deckview';
import CardListDeck from '../../components/CardListDeck';

const Decks = () => {
  return (

    <table>
        <tr>
          <td  width="110%" class="align-top">
            <CardListDeck />
          </td>
          <td  width="43%" class="align-end" >
            <Deckview />
          </td>
        </tr>
    </table>


  )
}

export default Decks;
