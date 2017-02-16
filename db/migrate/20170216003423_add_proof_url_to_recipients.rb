class AddProofUrlToRecipients < ActiveRecord::Migration[5.0]
  def change
    add_column :recipients, :proof_url, :string
  end
end
