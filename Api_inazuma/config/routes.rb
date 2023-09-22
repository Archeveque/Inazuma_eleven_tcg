# config/routes.rb

Rails.application.routes.draw do
  resources :goal_cards
  resources :technique_cards
  resources :reserve_cards
  resources :starting_cards
  resources :decks
  resources :allcards
  get '/decks/:id/starting/:cardid', to: 'decks#starting'

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  resources :articles
  get '/member-data', to: 'members#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
