module Spree
  class HomeController < Spree::StoreController
    def index
    end

    def contact
      ContactUsMailer.contact_us(message).deliver
      head :no_content
    end

    def image_manager
      # render json: [
      #   {
      #     url: '/image_manager/image_one.jpg',
      #     thumb: '/image_manager/thumbs/image_one.jpg',
      #     tag: 'image_one'
      #   },
      #   {
      #     url: '/image_manager/image_two.jpg',
      #     thumb: '/image_manager/thumbs/image_two.jpg',
      #     tag: 'image'
      #   }
      # ]
      render json: []
    end

    private

    def message
      { name: params[:name], email: params[:email], body: params[:message]}
    end
  end
end
