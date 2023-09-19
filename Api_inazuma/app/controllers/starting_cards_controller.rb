class StartingCardsController < ApplicationController
  before_action :set_starting_card, only: %i[ show update destroy ]

  # GET /starting_cards
  def index
    @starting_cards = StartingCard.all

    render json: @starting_cards
  end

  # GET /starting_cards/1
  def show
    render json: @starting_card
  end

  def all
    @allcards= StartingCard.all +ReserveCard.all +TechniqueCard.all
    render json @allcards
  end

  # POST /starting_cards
  def create
    @starting_card = StartingCard.new(starting_card_params)

    if @starting_card.save
      render json: @starting_card, status: :created, location: @starting_card
    else
      render json: @starting_card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /starting_cards/1
  def update
    if @starting_card.update(starting_card_params)
      render json: @starting_card
    else
      render json: @starting_card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /starting_cards/1
  def destroy
    @starting_card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_starting_card
      @starting_card = StartingCard.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def starting_card_params
      params.require(:starting_card).permit(:element, :name, :team, :position, :effect, :flavor, :sp, :extension, :rarity, :number, :cardid, :picture)
    end
end
