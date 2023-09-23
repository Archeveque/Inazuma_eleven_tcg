class Deck < ApplicationRecord
    has_many :add_starting_to_decks
    has_many :add_reserve_to_decks
    has_many :add_technique_to_decks
    has_many :add_goal_to_decks
    
    has_many :goal_cards, through: :add_goal_to_decks
    has_many :starting_cards, through: :add_starting_to_decks
    has_many :reserve_cards, through: :add_reserve_to_decks
    has_many :technique_cards, through: :add_technique_to_decks

    belongs_to :user

end
