module Spree
  class Group < Spree::Base
    belongs_to :user, class_name: Spree::User
    has_many :address_groups, dependent: :destroy
    has_many :addresses, through: :address_groups
  end
end
