require "test_helper"

class GoalCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @goal_card = goal_cards(:one)
  end

  test "should get index" do
    get goal_cards_url, as: :json
    assert_response :success
  end

  test "should create goal_card" do
    assert_difference("GoalCard.count") do
      post goal_cards_url, params: { goal_card: { cardid: @goal_card.cardid, effect: @goal_card.effect, element: @goal_card.element, extension: @goal_card.extension, flavor: @goal_card.flavor, name: @goal_card.name, number: @goal_card.number, picture: @goal_card.picture, rarity: @goal_card.rarity, sp: @goal_card.sp } }, as: :json
    end

    assert_response :created
  end

  test "should show goal_card" do
    get goal_card_url(@goal_card), as: :json
    assert_response :success
  end

  test "should update goal_card" do
    patch goal_card_url(@goal_card), params: { goal_card: { cardid: @goal_card.cardid, effect: @goal_card.effect, element: @goal_card.element, extension: @goal_card.extension, flavor: @goal_card.flavor, name: @goal_card.name, number: @goal_card.number, picture: @goal_card.picture, rarity: @goal_card.rarity, sp: @goal_card.sp } }, as: :json
    assert_response :success
  end

  test "should destroy goal_card" do
    assert_difference("GoalCard.count", -1) do
      delete goal_card_url(@goal_card), as: :json
    end

    assert_response :no_content
  end
end
