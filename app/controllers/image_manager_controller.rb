class ImageManagerController < ApplicationController
  def index
    # render json: [
    #   {
    #     url: '/image_manager/image_name.png',
    #     thumb: '/image_manager/thumbs/image_name.png',
    #     tag: 'display name'
    #   },
    #   {
    #     url: '/image_manager/image_name.png',
    #     thumb: '/image_manager/thumbs/image_name.png',
    #     tag: 'display name'
    #   }
    # ]
    render json: []
  end
end
