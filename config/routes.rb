Rails.application.routes.draw do
  # Static Page Routes
  root 'pages#home'
  get 'about' => 'pages#about'
  get 'contact' => 'pages#contact'

  # Spree Routes
  mount Spree::Core::Engine, :at => '/shop'
end
