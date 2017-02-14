module Spree
  class OrdersController < Spree::StoreController
    before_action :check_authorization
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    helper 'spree/products', 'spree/orders'

    respond_to :html

    before_action :assign_order, only: :update
    # note: do not lock the #edit action because that's where we redirect when we fail to acquire a lock
    around_action :lock_order, only: :update
    before_action :apply_coupon_code, only: :update
    skip_before_action :verify_authenticity_token, only: [:populate]

    def show
      @order = Spree::Order.find_by_number!(params[:id])
    end

    def update
      if backend? && order_params[:shipment_state]
        if @order.update(shipment_state: order_params[:shipment_state])
          flash[:success] = "Delivery status updated"
          return redirect_to admin_orders_url
        end
      end
      if @order.contents.update_cart(order_params)
        @order.next if params.key?(:checkout) && @order.cart?

        respond_with(@order) do |format|
          format.html do
            if params.key?(:checkout)
              redirect_to checkout_state_path(@order.checkout_steps.first)
            else
              redirect_to cart_path
            end
          end
        end
      else
        respond_with(@order)
      end
    end

    # Shows the current incomplete order from the session
    def edit
      @order = current_order || Spree::Order.incomplete.find_or_initialize_by(guest_token: cookies.signed[:guest_token])
      associate_user
    end

    # Adds a new item to the order (creating a new order if none already exists)
    def populate
      @order   = current_order(create_order_if_necessary: true)
      variant  = Spree::Variant.find(params[:variant_id])
      content = params[:content]
      content_file = params[:content_file]
      cover = params[:cover]
      deliver_on = params[:deliver_on]
      address_ids = get_address_ids
      quantity = address_ids.count

      if !address_ids
        flash[:error] = "Please select an address"
        return redirect_to product_path(variant.product.slug)
      end

      # 2,147,483,647 is crazy. See issue https://github.com/spree/spree/issues/2695.
      if !quantity.between?(1, 2_147_483_647)
        @order.errors.add(:base, Spree.t(:please_enter_reasonable_quantity))
      end

      begin
        @line_item = @order.contents.add(variant, quantity, content, content_file, cover, deliver_on, address_ids)
        lob_test @line_item
      rescue ActiveRecord::RecordInvalid => e
        @order.errors.add(:base, e.record.errors.full_messages.join(", "))
      end

      respond_with(@order) do |format|
        format.html do
          if @order.errors.any?
            flash[:error] = @order.errors.full_messages.join(", ")
            redirect_back_or_default(spree.root_path)
            return
          else
            redirect_to cart_path
          end
        end
      end
    end


    def populate_redirect
      flash[:error] = Spree.t(:populate_get_error)
      redirect_to('/cart')
    end

    def empty
      if @order = current_order
        @order.empty!
      end

      redirect_to spree.cart_path
    end

    def accurate_title
      if @order && @order.completed?
        Spree.t(:order_number, number: @order.number)
      else
        Spree.t(:shopping_cart)
      end
    end

    def check_authorization
      cookies.permanent.signed[:guest_token] = params[:token] if params[:token]
      order = Spree::Order.find_by_number(params[:id]) || current_order

      if order
        authorize! :edit, order, cookies.signed[:guest_token]
      else
        authorize! :create, Spree::Order
      end
    end

    private

    def lob_test line_item
      lob = Lob::Client.new(api_key: 'test_177c902b9fe8bda31018ccbbcea708809f0')
      if line_item.product.property('lob') == 'postcard'
        line_item.recipients.each do |recipient|
          address = recipient.address
          proof = lob.postcards.create(
            to: lob_address(address),
            from: lob_address(@order.bill_address),
            front: File.new(line_item.cover.path(:postcard)),
            back: "<html>#{line_item.content}</html>"
          )
          sleep 2
          recipient.update(proof: proof['url'])
        end
      end
    end

    def lob_address address
      return nil unless address
      {
        name: address.full_name,
        company: address.company,
        phone: address.phone,
        address_line1: address.address1,
        address_line2: address.address2,
        address_city: address.city,
        address_state: address.state.abbr,
        address_country: address.country.iso,
        address_zip: address.zipcode
      }
    end

    def backend?
      request.referrer == admin_orders_url
    end

    def get_address_ids
      address_ids = params[:address_ids] || []

      addresses = params[:addresses]
      address_ids += import_csv(addresses) if addresses

      address_params = order_params[:address_attributes]
      address = Spree::Address.create(address_params)
      if address.valid?
        address_ids += [address.id]
        save_to_address_book address.id
      end

      address_ids
    end

    def import_csv(addresses)
      address_ids = []
      CSV.foreach(addresses.path, headers: true) do |row|
        address_attributes = row.to_hash
        # Find the country and state ids
        country = find_country(address_attributes['country']) || Country.find(232)
        state = find_state(address_attributes['state'], country.id)
        address_attributes[:country_id] = country.id
        address_attributes[:state_id] = state.id
        address_attributes.except!('country', 'state')
        # Create address and add its id to array
        address = Spree::Address.create! address_attributes
        save_to_address_book address.id
        address_ids << address.id
      end
      address_ids
    end

    def save_to_address_book(address_id)
      if params[:save_to_address_book]
        Spree::UserAddress.create(address_id: address_id, user_id: spree_current_user.id)
      end
    end

    def order_params
      if params[:order]
        params.require(:order).permit(:shipment_state, :address_attributes=>[:id, :firstname, :lastname, :first_name, :last_name, :address1, :address2, :city, :country_id, :state_id, :zipcode, :phone, :state_name, :country_iso, :alternative_phone, :company, {:country=>[:iso, :name, :iso3, :iso_name], :state=>[:name, :abbr]}])
      else
        {}
      end
    end

    def assign_order
      return if backend? && @order = Spree::Order.find_by_number(params[:id])
      @order = current_order
      unless @order
        flash[:error] = Spree.t(:order_not_found)
        redirect_to(root_path) && return
      end
    end
  end
end
