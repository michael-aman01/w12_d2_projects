class User < ApplicationRecord
  has_secure_password # NOTE: takes care of password=, is_password -> .authenticate, presence validation, adds password_confirmation functionality
  before_validation :ensure_session_token

  validates :username, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: 'cannot be email' }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  def self.find_by_credentials(credential, password)

    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      @user = User.find_by(email: credential)
    else
      @user = User.find_by(username: credential)
    end
    
    if @user&.authenticate(password)
      @user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unqique_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unqique_session_token
  end

  private
  def generate_unqique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
  
end
