class Recipient < ApplicationRecord
  belongs_to :address,
    class_name: Spree::Address
  belongs_to :line_item,
    class_name: Spree::LineItem
end
