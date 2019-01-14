# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/assessment_form'

feature 'Case Worker Functionality' do
  before(:all) do
    @form = AssessmentForm.new
    @domain_total_count = []
    @total_radio_selected = []
  end

  after(:all) do
    logout
  end

  scenario 'Form Header, Domain, and Item common functionalities test' do
    login
    create_new_assessment
    input_date_and_calendar_icon_test
    fill_conducted_by_field('Mike Seaver')
    check_case_or_referral_number
    click_0_to_5_button
    expand_all_domains
    collapse_all_domains
    domain_and_item_rating_test
    discretion_and_not_applicable_checkbox_test
    item_and_domain_level_comment_test
    save_and_check_the_success_message
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
    visit_client_profile(CLIENT_NAME_2)
    expect(page).to have_content('ADD CANS')
    verify_radio_buttons_on_assessment_header
    validate_domain_radio_and_chevron
    click_button 'Save'
    visit_client_profile(CLIENT_NAME_2)
    visit_client_profile(CLIENT_NAME_2)
    expect(page).to have_content('In Progress')
    current_date = Time.now.strftime('%m/%d/%Y')
    find(:link, current_date + ' CANS', match: :first).click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
  end

  def create_new_assessment
    visit_client_profile(CLIENT_NAME)
    create_assessment_form
  end

  def input_date_and_calendar_icon_test
    @form.date_field.click
    @form.date_field.native.clear # avoid stuck
    @form.date_field.native.clear
    current_date = Time.now.strftime('%m/%d/%Y')
    new_date = Time.now.strftime('%m/11/%Y')
    @form.date_field.set current_date
    expect(@form.date_field.value).to eq(current_date)
    @form.calendar_icon.click
    @form.calendar_cell_11.click
    expect(@form.date_field.value).to eq(new_date)
  end

  def domain_and_item_rating_test
    @form.collapsed_domain_headers[0].click
    expect(@form).to have_domain_level_reg_rating
    target_domain_reg_radios = @form.domain_reg_radios[0, 4]
    @form.domain_level_reg_rating[0, 4].each_with_index do |label, index|
      label.click
      expect(target_domain_reg_radios[index].checked?).to be(true)
    end
    @form.inner_items[0].click
    expect(@form).to have_inner_item_rating
    @form.inner_item_rating.each_with_index do |label, index|
      label.click
      expect(@form.inner_item_radios[index].checked?).to be(true)
      expect(target_domain_reg_radios[index].checked?).to be(true)
    end
  end

  def discretion_and_not_applicable_checkbox_test
    discretion_checkbox_input = @form.discretion_checkbox_inputs[0]
    @form.discretion_checkbox[0].click
    expect(discretion_checkbox_input.checked?).to be(true)
    @form.discretion_checkbox[0].click
    expect(discretion_checkbox_input.checked?).to be(false)
    @form.not_applicable_checkbox.click
    within(@form.not_applicable_checkbox) do
      expect(find('input', visible: false).checked?).to be(true)
    end
    not_applicable_radio_group = @form.not_applicable_text.sibling('div.item-reg-rating')
    within(not_applicable_radio_group) do
      not_applicable_radios = page.all('input', visible: false)
      not_applicable_radios.each do |radio|
        expect(radio.disabled?).to be(true)
      end
    end
    @form.not_applicable_checkbox.click
    within(@form.not_applicable_checkbox) do
      expect(find('input', visible: false).checked?).to be(false)
    end
  end

  def item_and_domain_level_comment_test
    item_comment_content = 'some item level comments'
    @form.item_level_comment.set item_comment_content
    expect(@form.item_level_comment.value).to eq(item_comment_content)
    expect(page.has_content?("#{item_comment_content.length}/250")).to be(true)
    item_comment_label = @form.item_level_comment.sibling('label')
    within item_comment_label do
      expect(find('svg')[:class].include?('comment-icon-solid')).to be(true)
    end
    domain_comment_content = 'some domain level comments'
    @form.inner_items[-1].click
    @form.domain_level_comment.set domain_comment_content
    expect(@form.domain_level_comment.value).to eq(domain_comment_content)
    expect(page.has_content?("#{domain_comment_content.length}/2500")).to be(true)
    domain_comment_label = @form.domain_level_comment.sibling('label')
    within domain_comment_label do
      expect(find('svg')[:class].include?('comment-icon-solid')).to be(true)
    end
    within @form.domain_toolbar_comment_icon_block[0] do
      expect(find('svg')[:class].include?('comment-icon-solid')).to be(true)
    end
  end

  def change_some_rating_to_mixed_value
    targets = [
      '#label-IMPULSIVITY_HYPERACTIVITY-0',
      '#label-ANXIETY-2',
      '#label-OPPOSITIONAL-3',
      '#label-SEXUAL_ABUSE-0'
    ]
    targets.each { |element| find(element).click }
  end

  def adjust_domain_total_count
    @domain_total_count[0] = (@domain_total_count[0].to_i + 2).to_s
    @domain_total_count[-1] = (@domain_total_count[-1].to_i - 1).to_s
  end

  def fill_out_form_then_check_domain_total
    visit_client_profile(CLIENT_NAME)
    expect(page).to have_content('ADD CANS')
    create_assessment_form
    fill_conducted_by_field('Mike Seaver')
    click_0_to_5_button
    expect(page.find('#age-0-5-button')[:class].include?('age-button-selected')).to be(true)
    expect(page).to have_content('Age Range 0-5')
    fill_out_assessment_form_with_rating_1
    all_items_amount = page.all('span.progress-value').map(&:text)
    all_items_amount.each { |element| @domain_total_count.push(element.split('/')[1]) }
    change_some_rating_to_mixed_value
    adjust_domain_total_count
    collapse_all_domains
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
