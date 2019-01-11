# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'addressable', '~> 2.5.2'
gem 'cwds_store', github: 'ca-cwds/cwds_store'
gem 'dora', '~> 0.2.0', git: 'https://github.com/ca-cwds/dora_api'
gem 'faraday', '~> 0.13.1'
gem 'faraday_middleware', '~> 0.12.2'
gem 'feature'
gem 'newrelic_rpm', '~> 5.4', '>= 5.4.0.347'
# gem 'pg'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1.1'
gem 'redis-rails', '~> 5.0.2'
# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
#  Use for health check
gem 'system_information', github: 'ca-cwds/system_information'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Start writing modern ES6-flavored JavaScript
gem 'webpacker', '~> 3.5'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
  gem 'pry'
  gem 'pry-byebug'
end

group :development do
  gem 'foreman', require: false
  gem 'license_finder'
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'axe-matchers'
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'chromedriver-helper'
  gem 'faker'
  gem 'nyan-cat-formatter'
  gem 'rails-controller-testing'
  gem 'rspec'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
  gem 'site_prism'
  gem 'timecop'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
