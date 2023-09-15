class AddReserveToDeck < ApplicationRecord
    belongs_to :deck
    belongs_to :reserve_card
end
