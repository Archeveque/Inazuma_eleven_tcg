class AddGoalToDeck < ApplicationRecord
    belongs_to :deck
    belongs_to :goal_card
end
