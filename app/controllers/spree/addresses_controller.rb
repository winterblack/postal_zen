class Spree::AddressesController < Spree::StoreController
  before_action :set_address, only: [:show, :edit, :update, :destroy]

  # GET /spree/addresses
  # GET /spree/addresses.json
  def index
    @addresses = spree_current_user.addresses
  end

  # GET /spree/addresses/new
  def new
    @address = Spree::Address.build_default
  end

  # GET /spree/addresses/1/edit
  def edit
  end

  # POST /spree/addresses
  # POST /spree/addresses.json
  def create
    if params[:commit] == 'Import Contacts'
      import_contacts
    else
      respond_to do |format|
        if create_address address_params
          format.html { redirect_to addresses_url, notice: 'Address was successfully created.' }
          format.json { render :show, status: :created, location: @address }
        else
          format.html { render :new }
          format.json { render json: @address.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /spree/addresses/1
  # PATCH/PUT /spree/addresses/1.json
  def update
    respond_to do |format|
      if @address.update(address_params)
        format.html { redirect_to addresses_url, notice: 'Address was successfully updated.' }
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

  def create_address address
    @address = Spree::Address.new(address)
    if spree_current_user && @address.save
      Spree::UserAddress.create(user_id: spree_current_user.id, address_id: @address.id)
      true
    elsif @address.save
      true
    end
  end

  def lacrm_params
    lacrm_auth.to_h.merge({ Function: 'SearchContacts' })
  end

  def import_contacts
    JSON.parse(lacrm_response)["Result"].each do |contact|
      contact['Address'].each do |address|
        country_id = find_country(address['Country']).try(:id) || 232
        state_id = find_state(address['State'], country_id).try(:id)
        create_address({
          firstname: contact['FirstName'],
          lastname: contact['LastName'],
          address1: address['Street'],
          address2: '',
          city: address['City'],
          zipcode: address['Zip'],
          phone: contact['Phone'][0]['Text'],
          alternative_phone: '',
          company: contact['CompanyName'],
          country_id: country_id,
          state_id: state_id
        })
      end
    end
    redirect_to addresses_url
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_address
    @address = Spree::Address.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def address_params
    params.require(:address).permit(permitted_address_attributes)
  end
end
