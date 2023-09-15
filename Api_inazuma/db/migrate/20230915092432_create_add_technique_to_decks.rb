class CreateAddTechniqueToDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :add_technique_to_decks do |t|
      t.belongs_to :deck
      t.belongs_to :technique_card

      t.timestamps
    end
  end
end
