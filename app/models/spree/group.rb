module Spree
  class Group < Spree::Base
    belongs_to :user
    has_many :address_groups, dependent: :destroy
    has_many :addresses, through: :address_groups
  end
end
