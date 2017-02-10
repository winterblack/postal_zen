module Spree
  class Template < Spree::Base
    validates :user_id, presence: true
    belongs_to :user
  end
end
