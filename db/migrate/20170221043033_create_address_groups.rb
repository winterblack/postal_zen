class CreateAddressGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :address_groups do |t|
      t.integer :address_id, index: true
      t.integer :group_id, index: true

      t.timestamps
    end
  end
end
