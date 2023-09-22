class CreateAddGoalToDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :add_goal_to_decks do |t|
      t.belongs_to :deck
      t.belongs_to :goal_card
      
      t.timestamps
    end
  end
end

