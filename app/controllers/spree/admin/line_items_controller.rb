module Spree
  module Admin
    class LineItemsController < Spree::StoreController
      def show
        @line_item = LineItem.find(params[:id])
      end
    end
  end
end
