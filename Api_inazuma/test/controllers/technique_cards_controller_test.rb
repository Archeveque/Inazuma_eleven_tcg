require "test_helper"

class TechniqueCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @technique_card = technique_cards(:one)
  end

  test "should get index" do
    get technique_cards_url, as: :json
    assert_response :success
  end

  test "should create technique_card" do
    assert_difference("TechniqueCard.count") do
      post technique_cards_url, params: { technique_card: { cardid: @technique_card.cardid, effect: @technique_card.effect, element: @technique_card.element, extension: @technique_card.extension, flavor: @technique_card.flavor, level: @technique_card.level, name: @technique_card.name, number: @technique_card.number, picture: @technique_card.picture, rarity: @technique_card.rarity } }, as: :json
    end

    assert_response :created
  end

  test "should show technique_card" do
    get technique_card_url(@technique_card), as: :json
    assert_response :success
  end

  test "should update technique_card" do
    patch technique_card_url(@technique_card), params: { technique_card: { cardid: @technique_card.cardid, effect: @technique_card.effect, element: @technique_card.element, extension: @technique_card.extension, flavor: @technique_card.flavor, level: @technique_card.level, name: @technique_card.name, number: @technique_card.number, picture: @technique_card.picture, rarity: @technique_card.rarity } }, as: :json
    assert_response :success
  end

  test "should destroy technique_card" do
    assert_difference("TechniqueCard.count", -1) do
      delete technique_card_url(@technique_card), as: :json
    end

    assert_response :no_content
  end
end
