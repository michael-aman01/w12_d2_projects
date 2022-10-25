class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection # NOTE: includes forgeryprotect module
    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token # NOTE: need to run snake attach before every action
    helper_method :current_user, :logged_in?

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        if !logged_in
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def logged_in?
        !!current_user
    end

    def logout!
        current_user.reset_session_token! if logged_in?
        session[:session_token] = nil
        @current_user = nil
    end

    private 
    def snake_case_params # NOTE: turns all params from camel to snake
        params.deep_transform_keys!(&:underscore) # passes block underscore and turns it into a proc
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def invalid_authenticity_token
  render json: { message: 'Invalid authenticity token' }, 
    status: :unprocessable_entity
end

def unhandled_error(error)
    if request.accepts.first.html?
        raise error
    else
        @message = "#{error.class} - #{error.message}"
        @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
        render 'api/errors/internal_server_error', status: :internal_server_error
        logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
    end
  end

end
