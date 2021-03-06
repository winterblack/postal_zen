class Spree::UsersController < Spree::StoreController
  skip_before_action :set_current_order, only: :show
  prepend_before_action :load_object, only: [:show, :edit, :update, :address_book]
  prepend_before_action :authorize_actions, only: :new

  include Spree::Core::ControllerHelpers

  def show
    @user.bill_address ||= Spree::Address.build_default
    @orders = @user.orders.complete.order('completed_at desc')
  end

  def create
    @user = Spree::User.new(user_params)
    if @user.save

      if current_order
        session[:guest_token] = nil
      end

      redirect_back_or_default(root_url)
    else
      render :new
    end
  end

  def update
    if @user.update_attributes(user_params)
      if params[:user][:password].present?
        # this logic needed b/c devise wants to log us out after password changes
        user = Spree::User.reset_password_by_token(params[:user])
        sign_in(@user, event: :authentication, bypass: !Spree::Auth::Config[:signout_after_password_change])
      end
      redirect_to spree.account_url, notice: Spree.t(:account_updated)
    else
      render :edit
    end
  end

  def address_book
    @addresses = @user.addresses
  end

  private
    def user_params
      params.require(:user).permit(permitted_user_attributes | [:email])
    end

    def load_object
      @user ||= spree_current_user
      authorize! params[:action].to_sym, @user
    end

    def authorize_actions
      authorize! params[:action].to_sym, Spree::User.new
    end

    def accurate_title
      Spree.t(:my_account)
    end
end
