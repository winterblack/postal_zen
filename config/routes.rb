Rails.application.routes.draw do
  # Static Page Routes
  root 'pages#index'

  # Froala Image Manager API response
  get 'image_manager' => 'image_manager#index'

  # Contact Us Mailer
  post 'contact' => 'pages#contact'

  # Spree Routes
  mount Spree::Core::Engine, :at => '/shop'
  Spree::Core::Engine.routes.draw do
    resources :proof, only: [:show]
  end
end
