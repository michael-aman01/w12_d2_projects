# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Jbuilder.key_format camelize: :lower # ADDED: camelize keys
Jbuilder.deep_format_keys true # ADDED: camelizes nested keys
