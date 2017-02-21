require 'test_helper'

class Spree::GroupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @spree_group = spree_groups(:one)
  end

  test "should get index" do
    get spree_groups_url
    assert_response :success
  end

  test "should get new" do
    get new_spree_group_url
    assert_response :success
  end

  test "should create spree_group" do
    assert_difference('Spree::Group.count') do
      post spree_groups_url, params: { spree_group: {  } }
    end

    assert_redirected_to spree_group_url(Spree::Group.last)
  end

  test "should show spree_group" do
    get spree_group_url(@spree_group)
    assert_response :success
  end

  test "should get edit" do
    get edit_spree_group_url(@spree_group)
    assert_response :success
  end

  test "should update spree_group" do
    patch spree_group_url(@spree_group), params: { spree_group: {  } }
    assert_redirected_to spree_group_url(@spree_group)
  end

  test "should destroy spree_group" do
    assert_difference('Spree::Group.count', -1) do
      delete spree_group_url(@spree_group)
    end

    assert_redirected_to spree_groups_url
  end
end
