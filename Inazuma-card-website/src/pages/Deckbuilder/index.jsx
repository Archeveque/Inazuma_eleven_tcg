import Deckview from '../../components/Deckview';
import CardList from '../../components/CardList';

const Decks = () => {

  return (
    <div class=" container columns2">
        <div>
            <p>List of cards</p>
        <CardList />
        </div>
      <Deckview />
    </div>

  )
}
export default Decks;