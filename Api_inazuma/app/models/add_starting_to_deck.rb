class AddStartingToDeck < ApplicationRecord
    belongs_to :deck
    belongs_to :starting_card
end
