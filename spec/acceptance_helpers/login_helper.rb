# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    visit '/'
    return unless need_login?

    enter_credentials login_config
  end

  def enter_credentials(login_config = default_json)
    fill_in 'Authorization JSON', with: JSON.generate(login_config)
    click_button 'Sign In'
  end

  def logout
    visit '/'
    click_logout
  end

  def click_logout
    find('.profile-avatar').click
    find('.c_dropdown').click
  end

  private

  def need_login?
    ENV.fetch('CANS_AUTHORIZATION_ENABLED', true) && page.has_no_content?('CANS')
  end

  def default_json
    {
      'user': 'RACFID',
      'staffId': '0X5',
      'roles': ['CWS-admin', 'Supervisor', 'CANS-worker'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Ventura',
      'privileges': [
        'CANS-staff-person-clients-read',
        'CWS Case Management System',
        'Resource Management',
        'Resource Mgmt Placement Facility Maint',
        'Sealed',
        'Sensitive Persons',
        'Snapshot-rollout',
        'Hotline-rollout',
        'Facility-search-rollout',
        'RFA-rollout',
        'CANS-rollout',
        'CANS-assessment-read',
        'CANS-assessment-create',
        'CANS-assessment-in-progress-update',
        'CANS-assessment-completed-update',
        'CANS-assessment-completed-delete',
        'CANS-assessment-in-progress-delete',
        'CANS-assessment-complete',
        'CANS-client-read',
        'CANS-client-search',
        'development-not-in-use'
      ]
    }
  end

  def supervisor_json
    {
      'user': 'RACFID',
      'staffId': '0X5',
      'roles': ['CWS-admin', 'Supervisor', 'CANS-worker'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Ventura',
      'privileges': [
        'CANS-staff-person-subordinates-read',
        'CWS Case Management System',
        'Resource Management',
        'Resource Mgmt Placement Facility Maint',
        'Sealed',
        'Sensitive Persons',
        'Snapshot-rollout',
        'Hotline-rollout',
        'Facility-search-rollout',
        'RFA-rollout',
        'CANS-rollout',
        'CANS-assessment-read',
        'CANS-assessment-create',
        'CANS-assessment-in-progress-update',
        'CANS-assessment-completed-update',
        'CANS-assessment-completed-delete',
        'CANS-assessment-in-progress-delete',
        'CANS-assessment-complete',
        'CANS-client-read',
        'CANS-client-search',
        'CANS-staff-person-subordinates-read',
        'CANS-staff-person-read',
        'CANS-staff-person-clients-read',
        'development-not-in-use'
      ]
    }
  end

  def non_caseworker_json
    {
      'user': 'RACFID',
      'staffId': '0X5',
      'roles': ['CWS-admin', 'Supervisor', 'CANS-worker'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Ventura',
      'privileges': [
        'CWS Case Management System',
        'Resource Management',
        'Resource Mgmt Placement Facility Maint',
        'Sealed',
        'Sensitive Persons',
        'Snapshot-rollout',
        'Hotline-rollout',
        'Facility-search-rollout',
        'CANS-rollout',
        'CANS-client-read',
        'CANS-client-search',
        'CANS-assessment-read',
        'CANS-assessment-create',
        'CANS-assessment-in-progress-update',
        'CANS-assessment-in-progress-delete',
        'CANS-assessment-completed-delete',
        'CANS-assessment-complete',
        'development-not-in-use'
      ]
    }
  end
end
