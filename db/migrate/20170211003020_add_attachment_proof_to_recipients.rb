class AddAttachmentProofToRecipients < ActiveRecord::Migration
  def self.up
    change_table :recipients do |t|
      t.attachment :proof
    end
  end

  def self.down
    remove_attachment :recipients, :proof
  end
end
