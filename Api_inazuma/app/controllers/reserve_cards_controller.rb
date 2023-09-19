class ReserveCardsController < ApplicationController
  before_action :set_reserve_card, only: %i[ show update destroy ]

  # GET /reserve_cards
  def index
    @reserve_cards = ReserveCard.all

    render json: @reserve_cards.map { |card| card.attributes.merge({ cardType: 'reserve' }) }
  end

  # GET /reserve_cards/1
  def show
    render json: @reserve_card
  end

  # POST /reserve_cards
  def create
    @reserve_card = ReserveCard.new(reserve_card_params)

    if @reserve_card.save
      render json: @reserve_card, status: :created, location: @reserve_card
    else
      render json: @reserve_card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reserve_cards/1
  def update
    if @reserve_card.update(reserve_card_params)
      render json: @reserve_card
    else
      render json: @reserve_card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reserve_cards/1
  def destroy
    @reserve_card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reserve_card
      @reserve_card = ReserveCard.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reserve_card_params
      params.require(:reserve_card).permit(:element, :level, :name, :team, :position, :effect, :flavor, :sp, :firesp, :ap, :extension, :rarity, :number, :cardid, :picture)
    end
end
