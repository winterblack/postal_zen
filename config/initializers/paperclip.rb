if ENV['AWS_ACCESS_KEY_ID']
  Paperclip::Attachment.default_options.merge!(
    :fog_credentials => {
      :provider => "AWS",
      :aws_access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :aws_secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
      :region => ENV['AWS_REGION']
    },
    :fog_directory => ENV["S3_BUCKET_NAME"]
  )

  Spree::Image.attachment_definitions[:attachment].delete(:url)
  Spree::Image.attachment_definitions[:attachment].delete(:path)
end
