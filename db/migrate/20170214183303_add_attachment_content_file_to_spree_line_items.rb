class AddAttachmentContentFileToSpreeLineItems < ActiveRecord::Migration
  def self.up
    change_table :spree_line_items do |t|
      t.attachment :content_file
    end
  end

  def self.down
    remove_attachment :spree_line_items, :content_file
  end
end
