# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Case Worker Functionality' do
  before(:all) do
    @domain_total_count = []
    @total_radio_selected = []
  end

  after(:all) do
    logout
  end

  scenario 'Fill out and complete assessment from 0 to 5' do
    login
    fill_out_form_then_check_domain_total
    warning_and_summary_card_shown_after_complete_button_clicked
    verify_the_tool_tip_of_summary_card
    verify_the_content_of_summary_card
  end

  scenario 'Case worker login, creates assessment and logs out' do
    login
    expect(page).to have_content('CANS')
    expect(page).to have_content('Client List')
    visit_client_profile(CLIENT_NAME)
    expect(page).to have_content('ADD CANS')
    verify_radio_buttons_on_assessment_header
    validate_domain_radio_and_chevron
    click_button 'Save'
    visit_client_profile(CLIENT_NAME)
    visit_client_profile(CLIENT_NAME)
    expect(page).to have_content('In Progress')
    current_date = Time.now.strftime('%m/%d/%Y')
    find(:link, current_date + ' CANS', match: :first).click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
  end

  def fill_out_form_then_check_domain_total
    visit_client_profile(CLIENT_NAME)
    expect(page).to have_content('ADD CANS')
    create_assessment_form
    find('#age-0-5-button').click # avoid stuck
    find('#age-0-5-button').click
    expect(page.find('#age-0-5-button')[:class].include?('age-button-selected')).to be(true)
    expect(page).to have_content('Age Range 0-5')
    fill_assessment_form_age_0_5
    domain_totals = page.all('span.domain-score-badge').map(&:text)
    expect(domain_totals).to eq(@domain_total_count)
  end

  def warning_and_summary_card_shown_after_complete_button_clicked
    expect(find('#input-can-release-no', visible: false).checked?).to be(true)
    find('#submit-assessment').click
    expect(page.find('div.modal')['style']).to eq('display: block;')
    cancel_modal = page.find('button.warning-modal-logout')
    cancel_modal.click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
    expect(page).to have_content 'COMPLETE'
    find('#submit-assessment').click
    click_button 'I Agree'
    expect(page).to have_content('CANS Summary')
  end

  def verify_the_tool_tip_of_summary_card
    first_tip = page.all('i.assessment-summary-help-icon')[0]
    tip_text = 'Ratings of 0 or 1 in the Strengths Domain. These are central or useful in planning.'
    find('span', text: 'Strengths').click # avoid stuck
    first_tip.hover
    expect(page).to have_content(tip_text)
  end

  def verify_the_content_of_summary_card
    summary_columns = page.all('div.rt-tbody').map(&:text)
    strengths_column_text = ['Family Spiritual/Religious', 'Family Strengths', 'Interpersonal',
                             'Natural Supports', 'Playfulness', 'Relationship Permanence',
                             'Resiliency']
    action_required_column_text = ['Anxiety']
    immediate_action_required_column_text = ['Oppositional (Non-compliance with Authority)']
    trauma_column_text = ['Physical Abuse', 'Emotional Abuse', 'Neglect', 'Medical Trauma',
                          'Witness to Family Violence', 'Witness to Community/School Violence',
                          'Natural or Manmade Disaster', 'War/Terrorism Affected',
                          'Victim/Witness to Criminal Activity',
                          'Disruptions in Caregiving/Attachment Losses',
                          'Parental Criminal Behaviors']
    expect(summary_columns.length).to be(4)
    expect(summary_columns[0].split(/\r\n|\n|\r/)).to eq(strengths_column_text)
    expect(summary_columns[1].split(/\r\n|\n|\r/)).to eq(action_required_column_text)
    expect(summary_columns[2].split(/\r\n|\n|\r/)).to eq(immediate_action_required_column_text)
    expect(summary_columns[3].split(/\r\n|\n|\r/)).to eq(trauma_column_text)
  end
end
