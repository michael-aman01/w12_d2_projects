class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  def show
    if current_user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:credential], params[:user][:password])
    if @user
          login!(@user)
          render 'api/users/show'
        else
          render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
        end
  end

  def destroy
    logout!
    head :no_content
    render json: { message: 'success' }
  end

end