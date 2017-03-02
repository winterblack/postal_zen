module Spree
  class LineItemsController < Spree::StoreController
    def show
      @line_item = LineItem.find(params[:id])

      logger.debug('line item order')
      logger.debug(@line_item.order)
      logger.debug('line item user')
      logger.debug(@line_item.order.user)
      logger.debug('spree current user')
      logger.debug(spree_current_user)
      logger.debug('spree current user admin?')
      logger.debug(spree_current_user.admin?)

      redirect_to '/404' unless (@line_item.order.user == spree_current_user || spree_current_user.admin?)
    end
  end
end
