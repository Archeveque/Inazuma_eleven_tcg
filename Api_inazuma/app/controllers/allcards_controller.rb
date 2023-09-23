class AllcardsController < ApplicationController
    def index
        @allcards= (StartingCard.all) +(ReserveCard.all) +(TechniqueCard.all)+(GoalCard.all)
        render json: @allcards
      end 
end
