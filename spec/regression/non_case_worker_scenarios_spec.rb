# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/client_search'

feature 'Non Case Worker Functionality' do
  before(:all) do
    @form = ClientSearch.new
  end

  after(:all) do
    logout
  end

  scenario 'Non Case worker login, creates assessment and logs out' do
    login non_caseworker_json
    expect(page).to have_content('To Start a CANS Assessment, Search and Select the Child')
    @form.close_top_alert.click
    expect(page).not_to have_content('To Start a CANS Assessment, Search and Select the Child')
    @form.search_clients.click
    @form.search_clients.set CLIENT_NAME
    expect(@form.search_clients_link).to have_content('Case, Child 01 Test')
    @form.search_clients_link.click
    expect(page).to have_content 'Assessment History'
  end
end
