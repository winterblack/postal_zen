module Spree
  class TemplatesController < Spree::StoreController
  before_action :set_template, only: [:show, :edit, :update, :destroy]

  # GET /spree/templates
  # GET /spree/templates.json
  def index
    @templates = Spree::Template.all
  end

  # GET /spree/templates/1
  # GET /spree/templates/1.json
  def show
  end

  # GET /spree/templates/new
  def new
    @template = Spree::Template.new
  end

  # GET /spree/templates/1/edit
  def edit
  end

  # POST /spree/templates
  # POST /spree/templates.json
  def create
    @template = Spree::Template.new(template_params)
    @template.user_id = spree_current_user.id
    respond_to do |format|
      if @template.save
        format.html { redirect_to templates_path, notice: 'Template was successfully created.' }
        format.json { render :show, status: :created, location: @template }
      else
        format.html { render :new }
        format.json { render json: @template.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /spree/templates/1
  # PATCH/PUT /spree/templates/1.json
  def update
    respond_to do |format|
      if @template.update(template_params)
        format.html { redirect_to templates_path, notice: 'Template was successfully updated.' }
        format.json { render :show, status: :ok, location: @template }
      else
        format.html { render :edit }
        format.json { render json: @template.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spree/templates/1
  # DELETE /spree/templates/1.json
  def destroy
    @template.destroy
    respond_to do |format|
      format.html { redirect_to templates_url, notice: 'Template was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_template
      @template = Spree::Template.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def template_params
      params.require(:template).permit(:user_id, :title, :content)
    end
  end
end
