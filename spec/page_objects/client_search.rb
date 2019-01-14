# frozen_string_literal: true

require 'acceptance_helper'

class ClientSearch < SitePrism::Page
  element :close_top_alert, 'i.close-icon'
  element :search_clients, 'input#downshift-0-input'
  element :search_clients_link, 'div.full-name', text: 'Case, Child 01 Test'
end

@form = ClientSearch.new
