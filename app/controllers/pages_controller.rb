class PagesController < ApplicationController
  def index
  end

  def contact
    ContactUsMailer.contact_us(message).deliver
    head :no_content
  end

  private

  def message
    { name: params[:name], email: params[:email], body: params[:message]}
  end
end
