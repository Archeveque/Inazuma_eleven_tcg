require "test_helper"

class StartingCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @starting_card = starting_cards(:one)
  end

  test "should get index" do
    get starting_cards_url, as: :json
    assert_response :success
  end

  test "should create starting_card" do
    assert_difference("StartingCard.count") do
      post starting_cards_url, params: { starting_card: { cardid: @starting_card.cardid, effect: @starting_card.effect, element: @starting_card.element, extension: @starting_card.extension, flavor: @starting_card.flavor, name: @starting_card.name, number: @starting_card.number, picture: @starting_card.picture, position: @starting_card.position, rarity: @starting_card.rarity, sp: @starting_card.sp, team: @starting_card.team } }, as: :json
    end

    assert_response :created
  end

  test "should show starting_card" do
    get starting_card_url(@starting_card), as: :json
    assert_response :success
  end

  test "should update starting_card" do
    patch starting_card_url(@starting_card), params: { starting_card: { cardid: @starting_card.cardid, effect: @starting_card.effect, element: @starting_card.element, extension: @starting_card.extension, flavor: @starting_card.flavor, name: @starting_card.name, number: @starting_card.number, picture: @starting_card.picture, position: @starting_card.position, rarity: @starting_card.rarity, sp: @starting_card.sp, team: @starting_card.team } }, as: :json
    assert_response :success
  end

  test "should destroy starting_card" do
    assert_difference("StartingCard.count", -1) do
      delete starting_card_url(@starting_card), as: :json
    end

    assert_response :no_content
  end
end
