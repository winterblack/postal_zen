class CreateRecipients < ActiveRecord::Migration[5.0]
  def change
    create_table :recipients do |t|
      t.integer :address_id, null: false
      t.integer :line_item_id, null: false

      t.timestamps
    end
    add_index :recipients, :address_id
    add_index :recipients, :line_item_id
  end
end
