import Deckview from '../../components/Deckview';
import CardList from '../../components/CardList';

const Decks = () => {

  return (
    <table>
        <tr>
          <td>
            <CardList />
          </td>
          <td>
            <Deckview />
          </td>
        </tr>
    </table>

  )
}
export default Decks;