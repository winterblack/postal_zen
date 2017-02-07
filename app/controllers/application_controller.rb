class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def find_state state, country_id
    Spree::State.find_by(name: state, country_id: country_id) || Spree::State.find_by(abbr: state, country_id: country_id)
  end

  def find_country country
    Spree::Country.find_by(name: country) || Spree::Country.find_by(iso: country) || Spree::Country.find_by(iso3: country)
  end

  # Less Annoying CRM Helper Methods

  def lacrm_auth
    params.permit(:UserCode, :APIToken)
  end

  def lacrm_response
    uri = URI('https://api.lessannoyingcrm.com')
    uri.query = URI.encode_www_form(lacrm_params)
    Net::HTTP.get(uri)
  end
end
