class AddressGroup < ApplicationRecord
  belongs_to :address, class_name: Spree::Address
  belongs_to :group, class_name: Spree::Group
end
