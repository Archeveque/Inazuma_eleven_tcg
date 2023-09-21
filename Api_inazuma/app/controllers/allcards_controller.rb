class AllcardsController < ApplicationController
    def index
        @allcards= (StartingCard.all) +(ReserveCard.all) +(TechniqueCard.all)
        render json: @allcards
      end
      
    def by_category
      case params[:category]
      when "starting"
        @cards = StartingCard.all
      when "reserve"
        @cards = ReserveCard.all
      when "technique"
        @cards = TechniqueCard.all
      when "goal"
        @cards = GoalCard.all
      else
        render json: { error: "Invalid category" }, status: 400
        return
      end
      render json: @cards
    end
end
