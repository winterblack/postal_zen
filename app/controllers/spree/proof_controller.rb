module Spree
  class ProofController < Spree::StoreController
    def show
      @proof = LineItem.find(params[:id]).content
      respond_to do |format|
        format.pdf do
          render :pdf => 'proof'
        end
      end
    end
  end
end
