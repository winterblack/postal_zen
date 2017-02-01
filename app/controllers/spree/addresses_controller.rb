class Spree::AddressesController < Spree::StoreController
  before_action :set_address, only: [:show, :edit, :update, :destroy]

  # GET /spree/addresses
  # GET /spree/addresses.json
  def index
    @addresses = spree_current_user.addresses
  end

  # GET /spree/addresses/1
  # GET /spree/addresses/1.json
  def show
  end

  # GET /spree/addresses/new
  def new
    @address = Spree::Address.new
  end

  # GET /spree/addresses/1/edit
  def edit
  end

  # POST /spree/addresses
  # POST /spree/addresses.json
  def create
    @address = Spree::Address.new(address_params)

    respond_to do |format|
      if @address.save
        format.html { redirect_to @address, notice: 'Address was successfully created.' }
        format.json { render :show, status: :created, location: @address }
      else
        format.html { render :new }
        format.json { render json: @address.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /spree/addresses/1
  # PATCH/PUT /spree/addresses/1.json
  def update
    respond_to do |format|
      if @address.update(address_params)
        format.html { redirect_to @address, notice: 'Address was successfully updated.' }
        format.json { render :show, status: :ok, location: @address }
      else
        format.html { render :edit }
        format.json { render json: @address.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spree/addresses/1
  # DELETE /spree/addresses/1.json
  def destroy
    @address.destroy
    respond_to do |format|
      format.html { redirect_to addresses_url, notice: 'Address was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_address
      @address = Spree::Address.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def address_params
      params.fetch(:address, {})
    end
end
