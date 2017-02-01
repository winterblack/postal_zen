require 'test_helper'

class Spree::AddressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @spree_address = spree_addresses(:one)
  end

  test "should get index" do
    get spree_addresses_url
    assert_response :success
  end

  test "should get new" do
    get new_spree_address_url
    assert_response :success
  end

  test "should create spree_address" do
    assert_difference('Spree::Address.count') do
      post spree_addresses_url, params: { spree_address: {  } }
    end

    assert_redirected_to spree_address_url(Spree::Address.last)
  end

  test "should show spree_address" do
    get spree_address_url(@spree_address)
    assert_response :success
  end

  test "should get edit" do
    get edit_spree_address_url(@spree_address)
    assert_response :success
  end

  test "should update spree_address" do
    patch spree_address_url(@spree_address), params: { spree_address: {  } }
    assert_redirected_to spree_address_url(@spree_address)
  end

  test "should destroy spree_address" do
    assert_difference('Spree::Address.count', -1) do
      delete spree_address_url(@spree_address)
    end

    assert_redirected_to spree_addresses_url
  end
end
