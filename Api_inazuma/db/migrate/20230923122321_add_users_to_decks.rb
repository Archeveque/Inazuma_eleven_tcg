class AddUsersToDecks < ActiveRecord::Migration[7.0]
  def change
    add_column :decks, :user_id, :integer
    add_index :decks, :user_id
  end
end
