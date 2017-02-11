Rails.application.routes.draw do
  # Spree Routes
  mount Spree::Core::Engine, :at => '/'
  Spree::Core::Engine.routes.draw do
    resources :templates
    # Froala Image Manager API response
    get 'image_manager' => 'home#image_manager'
    # Contact Us Mailer
    post 'contact' => 'home#contact'
    resources :proof, only: [:show, :create]
    resources :addresses
    resources :line_items, only: [:show]
  end
end
