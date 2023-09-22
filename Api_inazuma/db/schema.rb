# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_22_150614) do
  create_table "add_goal_to_decks", force: :cascade do |t|
    t.integer "deck_id"
    t.integer "goal_card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_add_goal_to_decks_on_deck_id"
    t.index ["goal_card_id"], name: "index_add_goal_to_decks_on_goal_card_id"
  end

  create_table "add_reserve_to_decks", force: :cascade do |t|
    t.integer "deck_id"
    t.integer "reserve_card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_add_reserve_to_decks_on_deck_id"
    t.index ["reserve_card_id"], name: "index_add_reserve_to_decks_on_reserve_card_id"
  end

  create_table "add_starting_to_decks", force: :cascade do |t|
    t.integer "deck_id"
    t.integer "starting_card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_add_starting_to_decks_on_deck_id"
    t.index ["starting_card_id"], name: "index_add_starting_to_decks_on_starting_card_id"
  end

  create_table "add_technique_to_decks", force: :cascade do |t|
    t.integer "deck_id"
    t.integer "technique_card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_add_technique_to_decks_on_deck_id"
    t.index ["technique_card_id"], name: "index_add_technique_to_decks_on_technique_card_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goal_cards", force: :cascade do |t|
    t.string "element"
    t.string "name"
    t.text "effect"
    t.text "flavor"
    t.integer "sp"
    t.string "extension"
    t.string "rarity"
    t.integer "number"
    t.integer "cardid"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cardtype"
    t.string "team"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "reserve_cards", force: :cascade do |t|
    t.string "element"
    t.integer "level"
    t.string "name"
    t.string "team"
    t.string "position"
    t.text "effect"
    t.text "flavor"
    t.integer "sp"
    t.integer "firesp"
    t.integer "ap"
    t.string "extension"
    t.string "rarity"
    t.integer "number"
    t.integer "cardid"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cardtype"
  end

  create_table "starting_cards", force: :cascade do |t|
    t.string "element"
    t.string "name"
    t.string "team"
    t.string "position"
    t.text "effect"
    t.text "flavor"
    t.integer "sp"
    t.string "extension"
    t.string "rarity"
    t.integer "number"
    t.integer "cardid"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cardtype"
  end

  create_table "technique_cards", force: :cascade do |t|
    t.string "element"
    t.integer "level"
    t.string "name"
    t.text "effect"
    t.text "flavor"
    t.string "extension"
    t.string "rarity"
    t.integer "number"
    t.integer "cardid"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cardtype"
  end

  create_table "todacks", force: :cascade do |t|
    t.integer "deck_id", null: false
    t.integer "startingcard_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_todacks_on_deck_id"
    t.index ["startingcard_id"], name: "index_todacks_on_startingcard_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "articles", "users"
  add_foreign_key "todacks", "decks"
  add_foreign_key "todacks", "startingcards"
end
