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
    @deck = Deck.new(name: deck_params["name"],user_id: deck_params["user_id"])

    if @deck.save
      puts "saved"
      render json: @deck, status: :created, location: @deck
    else
      puts "failed"
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /decks/1
  def update
    if card_params["type"] == "starting"
      puts "starting detected"
      newcard = AddStartingToDeck.create(deck:Deck.find(card_params["deckid"]),starting_card: StartingCard.find_by(cardid: card_params["id"]));
    end
    if card_params["type"] == "reserve"
      puts "reserve detected"
      newcard = AddReserveToDeck.create(deck:Deck.find(card_params["deckid"]),reserve_card: ReserveCard.find_by(cardid: card_params["id"]));
    end
    if card_params["type"] == "technique"
      puts "technique detected"
      newcard = AddTechniqueToDeck.create(deck:Deck.find(card_params["deckid"]),technique_card: TechniqueCard.find_by(cardid: card_params["id"]));
    end
    if card_params["type"] == "goal"
      puts "goal detected"
      newcard = AddGoalToDeck.create(deck:Deck.find(card_params["deckid"]),goal_card: GoalCard.find_by(cardid: card_params["id"]));
    end
     
    if newcard.save
      puts "saved"
      render json: newcard
    else
      puts "error"
      render json: newcard, status: :unprocessable_entity
    end
  end

  # DELETE /decks/1
  def destroy
    Deck.find(params[:id]).destroy
  end

  def destroycard
    puts "test"
    puts card_params
    if card_params["type"] == "starting"
      puts "starting detected"
       AddStartingToDeck.find_by(deck:Deck.find(card_params["deckid"]),starting_card: StartingCard.find_by(cardid: card_params["id"])).destroy;
       puts "card deleted"
    end
    if card_params["type"] == "reserve"
      puts "reserve detected"
      AddReserveToDeck.find_by(deck:Deck.find(card_params["deckid"]),reserve_card: ReserveCard.find_by(cardid: card_params["id"])).destroy;
      puts "card deleted"
    end
    if card_params["type"] == "technique"
      puts "technique detected"
      AddTechniqueToDeck.find_by(deck:Deck.find(card_params["deckid"]),technique_card: TechniqueCard.find_by(cardid: card_params["id"])).destroy;
      puts "card deleted"
    end
    if card_params["type"] == "goal"
      puts "goal detected"
      AddGoalToDeck.find_by(deck:Deck.find(card_params["deckid"]),goal_card: GoalCard.find_by(cardid: card_params["id"])).destroy;
      puts "card deleted"
    end
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
      params.require(:deck).permit(:element, :level, :user_id, :name, :team, :position, :effect, :flavor, :sp, :firesp, :ap, :extension, :rarity, :number, :cardid, :picture)
    end
    def card_params
      params.require(:card).permit(:type, :id, :deckid )
    end
end