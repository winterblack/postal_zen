module Spree
  class LineItemsController < Spree::StoreController
    def show
      @line_item = LineItem.find(params[:id])
      redirect_to '/404' unless @line_item.order.user == spree_current_user
    end
  end
end
