# frozen_string_literal: true

require 'acceptance_helper'

class Assessment < SitePrism::Page
  element :age_0_5_button, '#age-0-5-button'
  element :expand_caregiver_domain, '#domain11-expand'
  element :add_caregiver, '[aria-label=add caregiver button]'
end
