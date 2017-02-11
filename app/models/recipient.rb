class Recipient < ApplicationRecord
  belongs_to :address, class_name: Spree::Address
  belongs_to :line_item, class_name: Spree::LineItem
  has_attached_file :proof,
    url: '/spree/line_items/:id/proof/:basename.:extension',
    path: ':rails_root/public/spree/line_items/:id/proof/:basename.:extension'
  validates_attachment_content_type :proof, content_type: 'application/pdf'
end
