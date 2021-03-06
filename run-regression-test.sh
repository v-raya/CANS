#!/bin/sh

# REGRESSION TEST MODE

export set REGRESSION_TEST=true

# ENV URL

export set CANS_WEB_BASE_URL=https://web.integration.cwds.io/cans

# SUPERVISOR CREDENTIALS

export set SUPERVISOR_USERNAME=
export set SUPERVISOR_PASSWORD=
export set SUPERVISOR_VERIFICATION_CODE=

# CASEWORKER CREDENTIALS

export set CASEWORKER_USERNAME=
export set CASEWORKER_PASSWORD=
export set CASEWORKER_VERIFICATION_CODE=

# NON CASE CARRYING WORKER CREDENTIALS

export set NON_CASEWORKER_USERNAME=
export set NON_CASEWORKER_PASSWORD=
export set NON_CASEWORKER_VERIFICATION_CODE=


rspec spec/regression/
