class AddUserIdToSpreeGroups < ActiveRecord::Migration[5.0]
  def change
    add_column :spree_groups, :user_id, :integer
    add_index :spree_groups, :user_id
  end
end
