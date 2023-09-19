class TechniqueCardsController < ApplicationController
  before_action :set_technique_card, only: %i[ show update destroy ]

  # GET /technique_cards
  def index
    @technique_cards = TechniqueCard.all

    render json: @technique_cards.map { |card| card.attributes.merge({ cardType: 'technique' }) }
  end

  # GET /technique_cards/1
  def show
    render json: @technique_card
  end

  # POST /technique_cards
  def create
    @technique_card = TechniqueCard.new(technique_card_params)

    if @technique_card.save
      render json: @technique_card, status: :created, location: @technique_card
    else
      render json: @technique_card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /technique_cards/1
  def update
    if @technique_card.update(technique_card_params)
      render json: @technique_card
    else
      render json: @technique_card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /technique_cards/1
  def destroy
    @technique_card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_technique_card
      @technique_card = TechniqueCard.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def technique_card_params
      params.require(:technique_card).permit(:element, :level, :name, :effect, :flavor, :extension, :rarity, :number, :cardid, :picture)
    end
end
