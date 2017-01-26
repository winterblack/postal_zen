class AddAttachmentCoverToLineItems < ActiveRecord::Migration
  def self.up
    change_table :spree_line_items do |t|
      t.attachment :cover
    end
  end

  def self.down
    remove_attachment :spree_line_items, :cover
  end
end
