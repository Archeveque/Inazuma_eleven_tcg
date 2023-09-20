import Deckview from '../../components/Deckview';
import CardList from '../../components/CardList';

const Decks = () => {
  return (

    <table>
        <tr>
          <td  width="100%" class="align-top">
            <CardList />
          </td>
          <td  width="43%">
            <Deckview />
          </td>
        </tr>
    </table>


  )
}

export default Decks;
