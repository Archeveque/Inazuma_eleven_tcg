class DecksController < ApplicationController
  before_action :set_deck, only: %i[ show update destroy ]

  # GET /decks
  def index
    @decks = Deck.all

    render json: @decks
  end

  # GET /decks/1
  def show
    render json: @deck
  end

  # POST /decks
  def create
    @deck = Deck.new(deck_params)

    if @deck.save
      render json: @deck, status: :created, location: @deck
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /decks/1
  def update
    if @deck.update(deck_params)
      render json: @deck
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  # DELETE /decks/1
  def destroy
    Deck.find(params[:id]).destroy
  end

  def destoycard
    deck = Deck.find(params[:id])
    @cardid = deck.starting_cards.find(params[:cardid])
    deck.starting_cards.delete(params[:cardid])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      cardarray=[]
      deck = Deck.find(params[:id])
      cardarray = deck.starting_cards + deck.reserve_cards + deck.technique_cards + deck.goal_cards

      @deck = cardarray
    end

    # Only allow a list of trusted parameters through.
    def deck_params
      params.require(:deck).permit(:element, :level, :name, :team, :position, :effect, :flavor, :sp, :firesp, :ap, :extension, :rarity, :number, :cardid, :picture)
    end
end