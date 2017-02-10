class CreateSpreeTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :spree_templates do |t|
      t.integer :user_id, null: false
      t.string :title
      t.text :content

      t.timestamps
    end
    add_index :spree_templates, :user_id
  end
end
