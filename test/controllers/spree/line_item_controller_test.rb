require 'test_helper'

class Spree::LineItemControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get spree_line_item_show_url
    assert_response :success
  end

end
