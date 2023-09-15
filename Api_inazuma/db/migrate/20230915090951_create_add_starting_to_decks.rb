class CreateAddStartingToDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :add_starting_to_decks do |t|
      t.belongs_to :deck
      t.belongs_to :starting_card

      t.timestamps
    end
  end
end
