# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


def deleteCardsAndDeck
  StartingCard.destroy_all
  ReserveCard.destroy_all
  TechniqueCard.destroy_all
  Deck.destroy_all
  puts "Old data deleted"
end

def GenerateUsers
  10.times do
    user = User.create!(
      email: Faker::Internet.email,
      password: Faker::Internet.password
    )
  end

  users = User.all

  puts "Users ok"
end

def generateCards
  puts "Generating cards...."

  name=["Mark Evans" "Axel Blaze","Jude Sharp","Shadow Cimmerian","Kevin Dragonfly","Jim Wraith","Steve Grim","Steve Eagle","Jamie Cool","Maddie Moonlight","Jack Wallside","Tim Saunders","Axel Blaze","Nathan Swift","Jim Wraith","Maxwell Carson","Tim Saunders","Heat Tackle","Inazuma Drop","Steve Eagle","Maddie Moonlight","Peter Drent","Jude Sharp","David Samford","Twin Boost","Mark Evans"]
  element=["Fire","Teamwork","Tactic","Speed","None"]
  team=["Raimon","Royal Academy","Inazuma KFC","Wild"]
  position=["FW","MF","DF"]
  effect=["Has a really strong effect","Has a decent effect","Really bad effect","none"]
  flavor=["This card exist","This text is boring","none","HAAAAAAAAAAAAAAAAAA","wow really interesting fact about this card"]
  rarity=["Starter","Common","Rare","Super Rare"]
  cardid = 1

  10.times do
    StartingCard.create(  
    element: element.sample,
    name: name.sample,
    team: team.sample,
    position: position.sample,
    effect: effect.sample,
    flavor: flavor.sample,
    sp: (rand(1..5)*100),
    extension: "Season 1",
    rarity: rarity.sample,
    number: cardid,
    cardid: cardid,
    picture: "https://i.ibb.co/8mHzjT7/placeholder-inazuma.png",
  )
  end

  puts "Starting Cards OK"

  10.times do
    sp=(rand(1..8)*100)
    ReserveCard.create(  
    element: element.sample,
    level: rand(1..6),
    name: name.sample,
    team: team.sample,
    position: position.sample,
    effect: effect.sample,
    flavor: flavor.sample,
    sp: sp,
    firesp: sp+(rand(1..3)*100),
    ap: (rand(1..3)*100),
    extension: "Season 1",
    rarity: rarity.sample,
    number: cardid,
    cardid: cardid,
    picture: "https://i.ibb.co/8mHzjT7/placeholder-inazuma.png",
  )
  end

  puts "Reserve Cards OK"

  10.times do
    TechniqueCard.create(  
    element: element.sample,
    level: rand(1..6),
    name: name.sample,
    effect: effect.sample,
    flavor: flavor.sample,
    extension: "Season 1",
    rarity: rarity.sample,
    number: cardid,
    cardid: cardid,
    picture: "https://i.ibb.co/8mHzjT7/placeholder-inazuma.png",
  )
  end
  puts "Technique Cards OK"
end

def generateDeck
  puts "generating a deck..."
  deck = Deck.create(name:"test deck #{rand(1..6969)}");

  10.times do
    AddStartingToDeck.create(deck:deck,starting_card: StartingCard.all.sample);
  end

  15.times do
    AddReserveToDeck.create(deck:deck,reserve_card: ReserveCard.all.sample);
    AddTechniqueToDeck.create(deck:deck,technique_card: TechniqueCard.all.sample);
  end

  puts "Deck created"
end

deleteCardsAndDeck
generateCards
generateDeck
