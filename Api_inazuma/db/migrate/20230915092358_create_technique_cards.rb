class CreateTechniqueCards < ActiveRecord::Migration[7.0]
  def change
    create_table :technique_cards do |t|
      t.string :element
      t.integer :level
      t.string :name
      t.text :effect
      t.text :flavor
      t.string :extension
      t.string :rarity
      t.integer :number
      t.integer :cardid
      t.string :picture

      t.timestamps
    end
  end
end
