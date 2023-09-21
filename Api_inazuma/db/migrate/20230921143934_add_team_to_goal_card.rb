class AddTeamToGoalCard < ActiveRecord::Migration[7.0]
  def change
    add_column :goal_cards, :team, :string
  end
end
