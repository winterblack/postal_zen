class AddDeliverOnToSpreeLineItem < ActiveRecord::Migration[5.0]
  def change
    add_column :spree_line_items, :deliver_on, :date
  end
end
