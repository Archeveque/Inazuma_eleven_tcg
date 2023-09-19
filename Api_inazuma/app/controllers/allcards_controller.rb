class AllcardsController < ApplicationController
    def index
        @allcards= (StartingCard.all) +(ReserveCard.all) +(TechniqueCard.all)
        render json: @allcards
      end
end
