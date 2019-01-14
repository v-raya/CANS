# frozen_string_literal: true

require 'axe/rspec'
require 'capybara'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'site_prism'
require 'acceptance_helpers/resource_helper'
require 'acceptance_helpers/create_in_process_form_helper'
require 'acceptance_helpers/login_helper'
require 'acceptance_helpers/prod_login_helper'

CLIENT_NAME = 'Case, Child 01 Test, Suff'
CLIENT_NAME_2 = 'Case, Child 02 Test, Suff'
STAFF_NAME = 'Regression, QA02'

def acceptance_helper
  return LoginHelper unless ENV.fetch('REGRESSION_TEST', false)
  ProdLoginHelper
end

Capybara.register_driver :selenium do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :chrome_headless

Capybara.configure do |config|
  include acceptance_helper
  include ResourceHelper
  include CreateInProcessFormHelper
  config.default_max_wait_time = 30
  config.default_driver = :selenium
  config.app_host = ENV.fetch('CANS_WEB_BASE_URL', 'http://localhost:3000')
end
