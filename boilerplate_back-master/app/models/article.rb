class Article < ApplicationRecord
    # before_action :authenticate_user!, only: [:create, :update, :edit, :destroy]
    
    belongs_to :user
    validates :title, presence: true
    validates :content, presence: true
end
