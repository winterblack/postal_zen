module Spree
  class ProofController < Spree::StoreController
    before_action :set_recipient
    before_action :create_proof_if_necessary

    def show
      if proof.exists?
        send_file(proof.path, filename: 'order_proof.pdf', disposition: 'inline',
          type: 'application/pdf')
      else
        @proof = @recipient.line_item.content
        respond_to { |format| format.pdf { render pdf: 'order_proof' } }
      end
    end

    private

    def set_recipient
      @recipient ||= Recipient.find(params[:id])
    end

    def proof
      @recipient.proof
    end

    def create_proof_if_necessary
      proof_url = @recipient.proof_url
      @recipient.update(proof: proof_url) if proof_url && !proof.exists?
    end
  end
end
