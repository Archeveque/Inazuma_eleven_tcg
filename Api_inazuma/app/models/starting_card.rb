class StartingCard < ApplicationRecord
    has_many :add_starting_to_decks
    has_many :decks, through: :add_starting_to_decks
end
