module Spree
  class TemplatesController < Spree::StoreController
  before_action :set_template, only: [:show, :edit, :update, :destroy]

  def index
    @templates = spree_current_user.templates
  end

  def new
    @template = Spree::Template.new
  end

  def edit
  end

  def create
    @template = Spree::Template.new(template_params)
    @template.user_id = spree_current_user.id
    if @template.save
      redirect_to templates_path, notice: 'Template was successfully created.'
    else
      render :new
    end
  end

  def update
    if @template.update(template_params)
      redirect_to templates_path, notice: 'Template was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @template.destroy
    redirect_to templates_url, notice: 'Template was successfully deleted.'
  end

  private
    def set_template
      @template = Spree::Template.find(params[:id])
    end

    def template_params
      params.require(:template).permit(:user_id, :title, :content)
    end
  end
end
