# frozen_string_literal: true

class AssessmentForm < SitePrism::Page
  element :date_field, 'input#assessment-date_input'
  element :calendar_icon, 'span.rw-i-calendar'
  element :calendar_cell_11, 'td.rw-cell', text: '11'
  element :conducted_by, 'input#conducted-by'
  element :case_or_referral, 'div#case-or-referral-number'
  element :age_0_to_5_button, 'button#age-0-5-button'
  elements :collapsed_domain_headers, 'div[aria-expanded="false"] h2'
  elements :inner_items, 'i.item-expand-icon'
  element :expand_all_button, 'button', text: 'EXPAND ALL'
  element :collapse_all_button, 'button', text: 'COLLAPSE ALL'
  element :collapsed_chevron, 'div[aria-expanded="false"]'
  element :expanded_chevron, 'div[aria-expanded="true"]'
  elements :domain_level_reg_rating, 'div.item-reg-rating label'
  elements :domain_reg_radios, 'div.item-reg-rating input', visible: false
  elements :inner_item_rating, 'div.item-form-control label'
  elements :inner_item_radios, 'div.item-form-control input', visible: false
  elements :all_regular_ratings_1, 'div.item-reg-rating label', text: '1'
  elements :all_boolean_ratings_yes, 'div.item-bool-rating label', text: 'Yes'
  elements :discretion_checkbox, 'div.item-confidential-block label'
  elements :discretion_checkbox_inputs, 'div.item-confidential-block input', visible: false
  element :not_applicable_checkbox, 'label', text: 'N/A'
  element :not_applicable_text, 'h2', text: 'N/A'
  element :item_level_comment, 'div.item-comment-block textarea'
  element :domain_level_comment, 'div.domain-comment-block textarea'
  elements :domain_toolbar_comment_icon_block, 'div.domain-toolbar-comment-icon-block'
  element :save_button, 'div.header-buttons-block i.fa-save'
  element :global_message_box, 'div.global-alert'
end

@form = AssessmentForm.new

def fill_conducted_by_field(text)
  @form.conducted_by.set text
  expect(@form.conducted_by.value).to eq(text)
end

def check_case_or_referral_number
  expect(@form.case_or_referral.text).not_to be_empty
end

def click_0_to_5_button
  @form.age_0_to_5_button.click
end

def expand_all_domains
  click_button('Expand All')
  expect(@form).to have_collapse_all_button
  expect(@form).to have_no_collapsed_chevron
end

def collapse_all_domains
  click_button('Collapse All')
  expect(@form).to have_expand_all_button
  expect(@form).to have_no_expanded_chevron
end

def fill_out_assessment_form_with_rating_1
  expand_all_domains
  @form.all_regular_ratings_1.each(&:click)
  @form.all_boolean_ratings_yes.each(&:click)
end

def save_and_check_the_success_message
  @form.save_button.click
  success_message = 'Success! CANS assessment has been saved'
  expect(@form.global_message_box.text).to include(success_message)
end
