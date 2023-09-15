class CreateAddReserveToDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :add_reserve_to_decks do |t|
      t.belongs_to :deck
      t.belongs_to :reserve_card

      t.timestamps
    end
  end
end
