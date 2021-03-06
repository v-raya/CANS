# frozen_string_literal: true

require 'infrastructure/security_gateway'

module Infrastructure
  class SecurityPolicy
    def initialize(security_gateway = SecurityGateway.new)
      @security_gateway = security_gateway
    end

    def validate_access(request)
      session_token = request.session['token']

      if session_token
        perry_account_response = @security_gateway.validate_token(session_token)

        # there may be existing session becuase of shared redis session
        # Verify here that 'previleges' needed by cans exists
        set_privileges(request, session_token, perry_account_response)
        return session_token if perry_account_response
      end

      new_token = fetch_new_token(request.params['accessCode'])
      return unless new_token

      request.session['token'] = new_token
      set_privileges(request, new_token)
    end

    private

    def set_privileges(request, token, perry_account_response = nil)
      return if request.session['privileges'].present?

      perry_account_response ||= @security_gateway.validate_token(token)

      return if perry_account_response.nil?

      perry_account_json = JSON.parse(perry_account_response, symbolize_names: true)
      request.session['privileges'] = perry_account_json[:privileges]
    end

    def fetch_new_token(access_code)
      @security_gateway.fetch_new_token(access_code)
    end
  end
end
