class ApplicationController < ActionController::API
    def after_sign_in_path_for(resource)
        render json: { redirect_path: '/Catalog' }
    end
end
