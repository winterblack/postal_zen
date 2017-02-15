module Spree
  class ProofController < Spree::StoreController

    def show
      proof = recipient.proof
      if proof.exists?
        send_file(proof.path, filename: 'order_proof.pdf', disposition: 'inline',
          type: 'application/pdf')
      else
        @proof = recipient.line_item.content
        respond_to { |format| format.pdf { render pdf: 'order_proof' } }
      end
    end

    private

    def recipient
      recipient = Recipient.find(params[:id])
    end
  end
end
