class Spree::AddressesController < Spree::StoreController
  before_action :set_address, only: [:show, :edit, :update, :destroy]

  def index
    @addresses = spree_current_user.addresses
  end

  def new
    @address = Spree::Address.build_default
  end

  def edit
  end

  def create
    if params[:commit] == 'Import Contacts'
      begin
        import_contacts
      rescue
        redirect_to addresses_url, flash: { error: 'Enter valid API Key and User Code'}
      end
    elsif params[:commit] == 'CSV Upload'
      begin
        import_csv
      rescue
        redirect_to addresses_url, flash: { error: 'Attach a valid CSV file'}
      end
    else
      if create_address address_params
        redirect_to addresses_url, notice: 'Address was successfully created.'
      else
        render :new
      end
    end
  end

  def update
    if @address.update(address_params)
      redirect_to addresses_url, notice: 'Address was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @address.destroy
    redirect_to addresses_url, notice: 'Address was successfully deleted.'
  end

  private

  def create_address address
    @address = Spree::Address.new(address)
    if spree_current_user && @address.save
      Spree::UserAddress.create(user: spree_current_user, address: @address)
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
    redirect_to addresses_url, notice: 'Addresses uploaded'
  end

  def import_csv
    addresses = params[:addresses]
    CSV.foreach(addresses.path, headers: true) do |row|
      address_attributes = row.to_hash
      # Find the country and state ids
      country = find_country(address_attributes['country']) || Spree::Country.find(232)
      state = find_state(address_attributes['state'], country.id)
      address_attributes[:country_id] = country.try(:id)
      address_attributes[:state_id] = state.try(:id)
      address_attributes.except!('country', 'state')
      # Create address and add its id to array
      address = create_address address_attributes
    end
    redirect_to addresses_url, notice: 'Addresses uploaded'
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
