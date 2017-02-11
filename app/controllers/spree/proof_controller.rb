module Spree
  class ProofController < Spree::StoreController
    def create
      
    end
    def show
      proof = Recipient.find(params[:id]).proof.path
      send_file(proof, filename: 'order_proof.pdf', disposition: 'inline', type: 'application/pdf')
    end
  end
end
