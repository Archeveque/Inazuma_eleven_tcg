require "test_helper"

class ReserveCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reserve_card = reserve_cards(:one)
  end

  test "should get index" do
    get reserve_cards_url, as: :json
    assert_response :success
  end

  test "should create reserve_card" do
    assert_difference("ReserveCard.count") do
      post reserve_cards_url, params: { reserve_card: { ap: @reserve_card.ap, cardid: @reserve_card.cardid, effect: @reserve_card.effect, element: @reserve_card.element, extension: @reserve_card.extension, firesp: @reserve_card.firesp, flavor: @reserve_card.flavor, level: @reserve_card.level, name: @reserve_card.name, number: @reserve_card.number, picture: @reserve_card.picture, position: @reserve_card.position, rarity: @reserve_card.rarity, sp: @reserve_card.sp, team: @reserve_card.team } }, as: :json
    end

    assert_response :created
  end

  test "should show reserve_card" do
    get reserve_card_url(@reserve_card), as: :json
    assert_response :success
  end

  test "should update reserve_card" do
    patch reserve_card_url(@reserve_card), params: { reserve_card: { ap: @reserve_card.ap, cardid: @reserve_card.cardid, effect: @reserve_card.effect, element: @reserve_card.element, extension: @reserve_card.extension, firesp: @reserve_card.firesp, flavor: @reserve_card.flavor, level: @reserve_card.level, name: @reserve_card.name, number: @reserve_card.number, picture: @reserve_card.picture, position: @reserve_card.position, rarity: @reserve_card.rarity, sp: @reserve_card.sp, team: @reserve_card.team } }, as: :json
    assert_response :success
  end

  test "should destroy reserve_card" do
    assert_difference("ReserveCard.count", -1) do
      delete reserve_card_url(@reserve_card), as: :json
    end

    assert_response :no_content
  end
end
