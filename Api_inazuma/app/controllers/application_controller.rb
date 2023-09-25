class ApplicationController < ActionController::API
    def after_sign_in_path_for(resource)
        allcards_path
    end
end
