class Addingtypetocards < ActiveRecord::Migration[7.0]
  def change
    add_column :starting_cards, :cardtype, :string
    add_column :reserve_cards, :cardtype, :string
    add_column :technique_cards, :cardtype, :string
    add_column :goal_cards, :cardtype, :string
  end
end
