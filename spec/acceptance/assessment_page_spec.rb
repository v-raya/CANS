# frozen_string_literal: true

require 'acceptance_helper'

CLIENT_IDENTIFIER = '0PcpFQu0QM'

feature 'Assessment Page' do
  before(:all) do
    login
  end

  scenario 'can fill and complete assessment' do
    visit "/clients/#{CLIENT_IDENTIFIER}"
    expect(page).to have_content('ADD CANS')
    post_new_assessment(CLIENT_IDENTIFIER)
    expect(page).to have_content 'Complete'
  end

  scenario 'Assessment Form page render alert message when page is refreshed' do
    visit "/clients/#{CLIENT_IDENTIFIER}/assessments"
    click_button 'Select date'
    page.driver.browser.navigate.refresh
    alert = page.driver.browser.switch_to.alert
    page.driver.browser.switch_to.alert.dismiss
    expect(alert).to be_present
  end
end
