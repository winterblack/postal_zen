class ContactUsMailer < ApplicationMailer
  default from: "contact_form@postalzen.com"
  def contact_us message
    @body = message[:body]
    @name = message[:name]
    mail to: "wylliam@toptal.com",
         reply_to: message[:email],
         subject: message[:subject]
  end
end
