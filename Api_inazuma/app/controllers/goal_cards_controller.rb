class GoalCardsController < ApplicationController
  before_action :set_goal_card, only: %i[ show update destroy ]

  # GET /goal_cards
  def index
    @goal_cards = GoalCard.all

    render json: @goal_cards
  end

  # GET /goal_cards/1
  def show
    render json: @goal_card
  end

  # POST /goal_cards
  def create
    @goal_card = GoalCard.new(goal_card_params)

    if @goal_card.save
      render json: @goal_card, status: :created, location: @goal_card
    else
      render json: @goal_card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /goal_cards/1
  def update
    if @goal_card.update(goal_card_params)
      render json: @goal_card
    else
      render json: @goal_card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goal_cards/1
  def destroy
    @goal_card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_goal_card
      @goal_card = GoalCard.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def goal_card_params
      params.require(:goal_card).permit(:element, :name, :effect, :flavor, :sp, :extension, :rarity, :number, :cardid, :picture)
    end
end
