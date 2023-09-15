class AddTechniqueToDeck < ApplicationRecord
    belongs_to :deck
    belongs_to :technique_card
end
