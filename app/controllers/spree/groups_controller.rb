class Spree::GroupsController < Spree::StoreController
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  def index
    @groups = spree_current_user.groups
  end

  def new
    @group = Spree::Group.new
    @addresses = spree_current_user.addresses
  end

  def edit
    @addresses = spree_current_user.addresses
  end

  def create
    @group = Spree::Group.create(group_params)
    @group.user = spree_current_user
    @group.save
    create_address_groups
    redirect_to groups_path, notice: 'Group was successfully created.'
  end

  def update
    @group.update(group_params)
    @group.address_groups.destroy_all
    create_address_groups
    redirect_to groups_path, notice: 'Group was successfully updated.'
  end

  def destroy
    @group.destroy
    redirect_to groups_url, notice: 'Group was successfully deleted.'
  end

  private

  def create_address_groups
    params[:address_ids].each do |address_id|
      AddressGroup.create(group: @group, address_id: address_id)
    end
  end

  def set_group
    @group = Spree::Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
