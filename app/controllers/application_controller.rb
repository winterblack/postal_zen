class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

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
