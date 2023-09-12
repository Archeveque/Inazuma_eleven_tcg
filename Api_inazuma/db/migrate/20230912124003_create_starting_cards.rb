class CreateStartingCards < ActiveRecord::Migration[7.0]
  def change
    create_table :starting_cards do |t|
      t.string :element
      t.string :name
      t.string :team
      t.string :position
      t.text :effect
      t.text :flavor
      t.integer :sp
      t.string :extension
      t.string :rarity
      t.integer :number
      t.integer :cardid
      t.string :picture

      t.timestamps
    end
  end
end
