# frozen_string_literal: true

require 'faker'
require 'active_support/time'

module ResourceHelper
  def post_new_assessment
    fill_and_save_assessment_form
  end

  private

  def fill_and_save_assessment_form
    find('#add-new-cans').click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
    find('#age-6-21-button').click
    find('#age-6-21-button').click # doing it twice since sometimes it fails on the first attempt
    find('#has-caregiver-yes').click
    behavioral_domain = [
      '#domain0-expand',
      '#PSYCHOSIS-item-expand',
      '#label-PSYCHOSIS-0',
      '#PSYCHOSISCheckbox',
      '#PSYCHOSIS-item-expand',
      '#IMPULSIVITY_HYPERACTIVITY-item-expand',
      '#label-IMPULSIVITY_HYPERACTIVITY-0',
      '#IMPULSIVITY_HYPERACTIVITYCheckbox',
      '#IMPULSIVITY_HYPERACTIVITY-item-expand',
      '#DEPRESSION-item-expand',
      '#label-DEPRESSION-0',
      '#DEPRESSIONCheckbox',
      '#DEPRESSION-item-expand',
      '#ANXIETY-item-expand',
      '#label-ANXIETY-0',
      '#ANXIETYCheckbox',
      '#ANXIETY-item-expand',
      '#OPPOSITIONAL-item-expand',
      '#label-OPPOSITIONAL-0',
      '#OPPOSITIONALCheckbox',
      '#OPPOSITIONAL-item-expand',
      '#CONDUCT-item-expand',
      '#label-CONDUCT-0',
      '#CONDUCTCheckbox',
      '#CONDUCT-item-expand',
      '#SUBSTANCE_USE-item-expand',
      '#label-SUBSTANCE_USE-0',
      '#SUBSTANCE_USECheckbox',
      '#SUBSTANCE_USE-item-expand',
      '#ANGER_CONTROL-item-expand',
      '#label-ANGER_CONTROL-0',
      '#ANGER_CONTROLCheckbox',
      '#ANGER_CONTROL-item-expand',
      '#ADJUSTMENT_TO_TRAUMA-item-expand',
      '#label-ADJUSTMENT_TO_TRAUMA-0',
      '#ADJUSTMENT_TO_TRAUMACheckbox',
      '#ADJUSTMENT_TO_TRAUMA-item-expand',
      '#domain0-expand'
    ]
    behavioral_domain.each { |element| find(element, wait: 15).click }
    click_button 'Save'
    expect(page).to have_content 'Success! CANS assessment has been saved'
    fill_and_submit_assessment_form_6_21
  end

  def fill_and_submit_assessment_form_6_21
    fetch_life_domain
    fetch_risk_domain
    fetch_cultural_domain
    fetch_strengths_domain
    fetch_caregiver_domain
    fetch_traumatic_domain
    find('#submit-assessment').click
    click_button 'I Agree'
    find('#cancel-assessment').click
    expect(page).to have_content 'Complete'
    expect(page).to have_content('ADD CANS', wait: 45)
    save_assessment_form_age_0_5
  end

  def fetch_life_domain
    life_domain = [
      '#domain1-expand',
      '#FAMILY_FUNCTIONING-item-expand',
      '#label-FAMILY_FUNCTIONING-0',
      '#FAMILY_FUNCTIONINGCheckbox',
      '#FAMILY_FUNCTIONING-item-expand',
      '#LIVING_SITUATION-item-expand',
      '#label-LIVING_SITUATION-0',
      '#LIVING_SITUATIONCheckbox',
      '#LIVING_SITUATION-item-expand',
      '#SOCIAL_FUNCTIONING-item-expand',
      '#label-SOCIAL_FUNCTIONING-0',
      '#SOCIAL_FUNCTIONINGCheckbox',
      '#SOCIAL_FUNCTIONING-item-expand',
      '#DEVELOPMENTAL_INTELLECTUAL-item-expand',
      '#label-DEVELOPMENTAL_INTELLECTUAL-0',
      '#DEVELOPMENTAL_INTELLECTUALCheckbox',
      '#DEVELOPMENTAL_INTELLECTUAL-item-expand',
      '#DECISION_MAKING-item-expand',
      '#label-DECISION_MAKING-0',
      '#DECISION_MAKINGCheckbox',
      '#DECISION_MAKING-item-expand',
      '#SCHOOL_BEHAVIOR-item-expand',
      '#label-SCHOOL_BEHAVIOR-0',
      '#SCHOOL_BEHAVIORCheckbox',
      '#SCHOOL_BEHAVIOR-item-expand',
      '#SCHOOL_ACHIEVEMENT-item-expand',
      '#label-SCHOOL_ACHIEVEMENT-0',
      '#SCHOOL_ACHIEVEMENTCheckbox',
      '#SCHOOL_ACHIEVEMENT-item-expand',
      '#SCHOOL_ATTENDANCE-item-expand',
      '#label-SCHOOL_ATTENDANCE-0',
      '#SCHOOL_ATTENDANCECheckbox',
      '#SCHOOL_ATTENDANCE-item-expand',
      '#MEDICAL_PHYSICAL-item-expand',
      '#label-MEDICAL_PHYSICAL-0',
      '#MEDICAL_PHYSICALCheckbox',
      '#MEDICAL_PHYSICAL-item-expand',
      '#SEXUAL_DEVELOPMENT-item-expand',
      '#label-SEXUAL_DEVELOPMENT-0',
      '#SEXUAL_DEVELOPMENTCheckbox',
      '#SEXUAL_DEVELOPMENT-item-expand',
      '#SLEEP-item-expand',
      '#label-SLEEP-0',
      '#SLEEPCheckbox',
      '#SLEEP-item-expand'
    ]
    life_domain.each { |element| find(element).click }
  end

  def fetch_risk_domain
    risk_domain = [
      '#domain2-expand',
      '#SUICIDE_RISK-item-expand',
      '#label-SUICIDE_RISK-0',
      '#SUICIDE_RISKCheckbox',
      '#SUICIDE_RISK-item-expand',
      '#SELF_INJURIOUS_BEHVIOR-item-expand',
      '#label-SELF_INJURIOUS_BEHVIOR-0',
      '#SELF_INJURIOUS_BEHVIORCheckbox',
      '#SELF_INJURIOUS_BEHVIOR-item-expand',
      '#OTHER_SELF_HARM-item-expand',
      '#label-OTHER_SELF_HARM-0',
      '#OTHER_SELF_HARMCheckbox',
      '#OTHER_SELF_HARM-item-expand',
      '#DANGERS_TO_OTHERS-item-expand',
      '#label-DANGERS_TO_OTHERS-0',
      '#DANGERS_TO_OTHERSCheckbox',
      '#DANGERS_TO_OTHERS-item-expand',
      '#RUNAWAY-item-expand',
      '#label-RUNAWAY-0',
      '#RUNAWAYCheckbox',
      '#RUNAWAY-item-expand',
      '#SEXUAL_AGGRESSION-item-expand',
      '#label-SEXUAL_AGGRESSION-0',
      '#SEXUAL_AGGRESSIONCheckbox',
      '#SEXUAL_AGGRESSION-item-expand',
      '#DELINQUENT_BEHAVIOR-item-expand',
      '#label-DELINQUENT_BEHAVIOR-0',
      '#DELINQUENT_BEHAVIORCheckbox',
      '#DELINQUENT_BEHAVIOR-item-expand',
      '#INTENTIONAL_MISBEHAVIOR-item-expand',
      '#label-INTENTIONAL_MISBEHAVIOR-0',
      '#INTENTIONAL_MISBEHAVIORCheckbox',
      '#INTENTIONAL_MISBEHAVIOR-item-expand'
    ]
    risk_domain.each { |element| find(element).click }
  end

  def fetch_cultural_domain
    cultural_domain = [
      '#domain3-expand',
      '#LANGUAGE-item-expand',
      '#label-LANGUAGE-0',
      '#LANGUAGECheckbox',
      '#LANGUAGE-item-expand',
      '#TRADITIONS_RITUALS-item-expand',
      '#label-TRADITIONS_RITUALS-0',
      '#TRADITIONS_RITUALSCheckbox',
      '#TRADITIONS_RITUALS-item-expand',
      '#CULTURAL_STRESS-item-expand',
      '#label-CULTURAL_STRESS-0',
      '#CULTURAL_STRESSCheckbox',
      '#CULTURAL_STRESS-item-expand'
    ]
    cultural_domain.each { |element| find(element).click }
  end

  def fetch_strengths_domain
    strengths_domain = [
      '#domain4-expand',
      '#FAMILY_STRENGTHS-item-expand',
      '#label-FAMILY_STRENGTHS-0',
      '#FAMILY_STRENGTHSCheckbox',
      '#FAMILY_STRENGTHS-item-expand',
      '#INTERPERSONAL-item-expand',
      '#label-INTERPERSONAL-0',
      '#INTERPERSONALCheckbox',
      '#INTERPERSONAL-item-expand',
      '#EDUCATIONAL_SETTING-item-expand',
      '#label-EDUCATIONAL_SETTING-0',
      '#EDUCATIONAL_SETTINGCheckbox',
      '#EDUCATIONAL_SETTING-item-expand',
      '#TALENTS_INTERESTS-item-expand',
      '#label-TALENTS_INTERESTS-0',
      '#TALENTS_INTERESTSCheckbox',
      '#TALENTS_INTERESTS-item-expand',
      '#SPIRITUAL_RELIGIOUS-item-expand',
      '#label-SPIRITUAL_RELIGIOUS-0',
      '#SPIRITUAL_RELIGIOUSCheckbox',
      '#SPIRITUAL_RELIGIOUS-item-expand',
      '#CULTURAL_IDENTITY-item-expand',
      '#label-CULTURAL_IDENTITY-0',
      '#CULTURAL_IDENTITYCheckbox',
      '#CULTURAL_IDENTITY-item-expand',
      '#COMMUNITY_LIFE-item-expand',
      '#label-COMMUNITY_LIFE-0',
      '#COMMUNITY_LIFECheckbox',
      '#COMMUNITY_LIFE-item-expand',
      '#NATURAL_SUPPORTS-item-expand',
      '#label-NATURAL_SUPPORTS-0',
      '#NATURAL_SUPPORTSCheckbox',
      '#NATURAL_SUPPORTS-item-expand',
      '#RESILIENCY-item-expand',
      '#label-RESILIENCY-0',
      '#RESILIENCYCheckbox',
      '#RESILIENCY-item-expand'
    ]
    strengths_domain.each { |element| find(element).click }
  end

  def fetch_caregiver_domain
    caregiver_domain = [
      '#domain11-expand',
      '#SUPERVISION-item-expand',
      '#label-SUPERVISION-0',
      '#SUPERVISIONCheckbox',
      '#SUPERVISION-item-expand',
      '#INVOLVEMENT_WITH_CARE-item-expand',
      '#label-INVOLVEMENT_WITH_CARE-0',
      '#INVOLVEMENT_WITH_CARECheckbox',
      '#INVOLVEMENT_WITH_CARE-item-expand',
      '#KNOWLEDGE-item-expand',
      '#label-KNOWLEDGE-0',
      '#KNOWLEDGECheckbox',
      '#KNOWLEDGE-item-expand',
      '#SOCIAL_RESOURCES-item-expand',
      '#label-SOCIAL_RESOURCES-0',
      '#SOCIAL_RESOURCESCheckbox',
      '#SOCIAL_RESOURCES-item-expand',
      '#RESIDENT_STABILITY-item-expand',
      '#label-RESIDENT_STABILITY-0',
      '#RESIDENT_STABILITYCheckbox',
      '#RESIDENT_STABILITY-item-expand',
      '#MEDICAL_PHYSICAL_CAREGIVER-item-expand',
      '#label-MEDICAL_PHYSICAL_CAREGIVER-0',
      '#MEDICAL_PHYSICAL_CAREGIVERCheckbox',
      '#MEDICAL_PHYSICAL_CAREGIVER-item-expand',
      '#MENTAL_HEALTH-item-expand',
      '#label-MENTAL_HEALTH-0',
      '#MENTAL_HEALTHCheckbox',
      '#MENTAL_HEALTH-item-expand',
      '#SUBSTANCE_USE_CAREGIVER-item-expand',
      '#label-SUBSTANCE_USE_CAREGIVER-0',
      '#SUBSTANCE_USE_CAREGIVERCheckbox',
      '#SUBSTANCE_USE_CAREGIVER-item-expand',
      '#DEVELOPMENTAL-item-expand',
      '#label-DEVELOPMENTAL-0',
      '#DEVELOPMENTALCheckbox',
      '#DEVELOPMENTAL-item-expand',
      '#SAFETY-item-expand',
      '#label-SAFETY-0',
      '#SAFETYCheckbox',
      '#SAFETY-item-expand'
    ]
    caregiver_domain.each { |element| find(element).click }
  end

  def fetch_traumatic_domain
    traumatic_domain = [
      '#domain12-expand',
      '#SEXUAL_ABUSE-item-expand',
      '#label-SEXUAL_ABUSE-0',
      '#SEXUAL_ABUSECheckbox',
      '#SEXUAL_ABUSE-item-expand',
      '#PHYSICAL_ABUSE-item-expand',
      '#label-PHYSICAL_ABUSE-0',
      '#PHYSICAL_ABUSECheckbox',
      '#PHYSICAL_ABUSE-item-expand',
      '#EMOTIONAL_ABUSE-item-expand',
      '#label-EMOTIONAL_ABUSE-0',
      '#EMOTIONAL_ABUSECheckbox',
      '#EMOTIONAL_ABUSE-item-expand',
      '#NEGLECT-item-expand',
      '#label-NEGLECT-0',
      '#NEGLECTCheckbox',
      '#NEGLECT-item-expand',
      '#MEDICAL_TRAUMA-item-expand',
      '#label-MEDICAL_TRAUMA-0',
      '#MEDICAL_TRAUMACheckbox',
      '#MEDICAL_TRAUMA-item-expand',
      '#WITNESS_FAMILY_VIOLENCE-item-expand',
      '#label-WITNESS_FAMILY_VIOLENCE-0',
      '#WITNESS_FAMILY_VIOLENCECheckbox',
      '#WITNESS_FAMILY_VIOLENCE-item-expand',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCE-item-expand',
      '#label-WITNESS_COMMUNITY_SCHOOL_VIOLENCE-0',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCECheckbox',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCE-item-expand',
      '#NATURAL_MANMADE_DISASTER-item-expand',
      '#label-NATURAL_MANMADE_DISASTER-0',
      '#NATURAL_MANMADE_DISASTERCheckbox',
      '#NATURAL_MANMADE_DISASTER-item-expand',
      '#WAR_TERRORISM_AFFECTED-item-expand',
      '#label-WAR_TERRORISM_AFFECTED-0',
      '#WAR_TERRORISM_AFFECTEDCheckbox',
      '#WAR_TERRORISM_AFFECTED-item-expand',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITY-item-expand',
      '#label-VICTIM_WITNESS_CRIMINAL_ACTIVITY-0',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITYCheckbox',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITY-item-expand',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSES-item-expand',
      '#label-DISRUPTIONS_CG_ATTACHMENT_LOSSES-0',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSESCheckbox',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSES-item-expand',
      '#CG_CRIMINAL_BEHAVIOR-item-expand',
      '#label-CG_CRIMINAL_BEHAVIOR-0',
      '#CG_CRIMINAL_BEHAVIORCheckbox',
      '#CG_CRIMINAL_BEHAVIOR-item-expand'
    ]
    traumatic_domain.each { |element| find(element).click }
  end

  def save_assessment_form_age_0_5
    find('#add-new-cans').click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
    find('#age-0-5-button').click
    find('#age-0-5-button').click # doing it twice since sometimes it fails on the first attempt
    find('#has-caregiver-yes').click
    fill_and_complete_assessment_form_age_0_5
  end

  def fill_and_complete_assessment_form_age_0_5
    fetch_challenges_domain
    fetch_functioning_domain
    fetch_risk_behaviors_domain
    fetch_cultural_factors_domain
    fetch_minor_strengths_domain
    fetch_dyadic_domain
    fetch_caregiver_resources_domain
    fetch_minor_traumatic_domain
    find('#submit-assessment').click
    click_button 'I Agree'
    find('#cancel-assessment').click
  end

  def fetch_challenges_domain
    challenges_domain = [
      '#domain5-expand',
      '#IMPULSIVITY_HYPERACTIVITY-item-expand',
      '#label-IMPULSIVITY_HYPERACTIVITY-0',
      '#IMPULSIVITY_HYPERACTIVITYCheckbox',
      '#IMPULSIVITY_HYPERACTIVITY-item-expand',
      '#DEPRESSION-item-expand',
      '#label-DEPRESSION-0',
      '#DEPRESSIONCheckbox',
      '#DEPRESSION-item-expand',
      '#ANXIETY-item-expand',
      '#label-ANXIETY-0',
      '#ANXIETYCheckbox',
      '#ANXIETY-item-expand',
      '#OPPOSITIONAL-item-expand',
      '#label-OPPOSITIONAL-0',
      '#OPPOSITIONALCheckbox',
      '#OPPOSITIONAL-item-expand',
      '#ADJUSTMENT_TO_TRAUMA-item-expand',
      '#label-ADJUSTMENT_TO_TRAUMA-0',
      '#ADJUSTMENT_TO_TRAUMACheckbox',
      '#ADJUSTMENT_TO_TRAUMA-item-expand',
      '#ATTACHMENT_DIFFICULTIES-item-expand',
      '#label-ATTACHMENT_DIFFICULTIES-0',
      '#ATTACHMENT_DIFFICULTIESCheckbox',
      '#ATTACHMENT_DIFFICULTIES-item-expand',
      '#REGULATORY-item-expand',
      '#label-REGULATORY-0',
      '#REGULATORYCheckbox',
      '#REGULATORY-item-expand',
      '#ATYPICAL_BEHAVIORS-item-expand',
      '#label-ATYPICAL_BEHAVIORS-0',
      '#ATYPICAL_BEHAVIORSCheckbox',
      '#ATYPICAL_BEHAVIORS-item-expand',
      '#SLEEP_CHILD-item-expand',
      '#label-SLEEP_CHILD-0',
      '#SLEEP_CHILDCheckbox',
      '#SLEEP_CHILD-item-expand'
    ]
    challenges_domain.each { |element| find(element).click }
  end

  def fetch_functioning_domain
    functioning_domain = [
      '#domain6-expand',
      '#FAMILY_FUNCTIONING-item-expand',
      '#label-FAMILY_FUNCTIONING-0',
      '#FAMILY_FUNCTIONINGCheckbox',
      '#FAMILY_FUNCTIONING-item-expand',
      '#EARLY_EDUCATION-item-expand',
      '#label-EARLY_EDUCATION-0',
      '#EARLY_EDUCATIONCheckbox',
      '#EARLY_EDUCATION-item-expand',
      '#SOCIAL_EMOTIONAL_FUNCTIONING-item-expand',
      '#label-SOCIAL_EMOTIONAL_FUNCTIONING-0',
      '#SOCIAL_EMOTIONAL_FUNCTIONINGCheckbox',
      '#SOCIAL_EMOTIONAL_FUNCTIONING-item-expand',
      '#DEVELOPMENTAL_INTELLECTUAL-item-expand',
      '#label-DEVELOPMENTAL_INTELLECTUAL-0',
      '#DEVELOPMENTAL_INTELLECTUALCheckbox',
      '#DEVELOPMENTAL_INTELLECTUAL-item-expand',
      '#MEDICAL_PHYSICAL-item-expand',
      '#label-MEDICAL_PHYSICAL-0',
      '#MEDICAL_PHYSICALCheckbox',
      '#MEDICAL_PHYSICAL-item-expand'
    ]
    functioning_domain.each { |element| find(element).click }
  end

  def fetch_risk_behaviors_domain
    risk_behaviors_domain = [
      '#domain7-expand',
      '#SELF_HARM-item-expand',
      '#label-SELF_HARM-0',
      '#SELF_HARMCheckbox',
      '#SELF_HARM-item-expand',
      '#EXPLOITED-item-expand',
      '#label-EXPLOITED-0',
      '#EXPLOITEDCheckbox',
      '#EXPLOITED-item-expand',
      '#PRENATAL_CARE-item-expand',
      '#label-PRENATAL_CARE-0',
      '#PRENATAL_CARECheckbox',
      '#PRENATAL_CARE-item-expand',
      '#EXPOSURE-item-expand',
      '#label-EXPOSURE-0',
      '#EXPOSURECheckbox',
      '#EXPOSURE-item-expand',
      '#LABOR_DELIVERY-item-expand',
      '#label-LABOR_DELIVERY-0',
      '#LABOR_DELIVERYCheckbox',
      '#LABOR_DELIVERY-item-expand',
      '#BIRTH_WEIGHT-item-expand',
      '#label-BIRTH_WEIGHT-0',
      '#BIRTH_WEIGHTCheckbox',
      '#BIRTH_WEIGHT-item-expand',
      '#FAILURE_TO_THRIVE-item-expand',
      '#label-FAILURE_TO_THRIVE-0',
      '#FAILURE_TO_THRIVECheckbox',
      '#FAILURE_TO_THRIVE-item-expand'
    ]
    risk_behaviors_domain.each { |element| find(element).click }
  end

  def fetch_cultural_factors_domain
    cultural_factors_domain = [
      '#domain8-expand',
      '#LANGUAGE-item-expand',
      '#label-LANGUAGE-0',
      '#LANGUAGECheckbox',
      '#LANGUAGE-item-expand',
      '#TRADITIONS_RITUALS-item-expand',
      '#label-TRADITIONS_RITUALS-0',
      '#TRADITIONS_RITUALSCheckbox',
      '#TRADITIONS_RITUALS-item-expand',
      '#CULTURAL_STRESS-item-expand',
      '#label-CULTURAL_STRESS-0',
      '#CULTURAL_STRESSCheckbox',
      '#CULTURAL_STRESS-item-expand'
    ]
    cultural_factors_domain.each { |element| find(element).click }
  end

  def fetch_minor_strengths_domain
    strengths_domain = [
      '#domain9-expand',
      '#FAMILY_STRENGTHS-item-expand',
      '#label-FAMILY_STRENGTHS-0',
      '#FAMILY_STRENGTHSCheckbox',
      '#FAMILY_STRENGTHS-item-expand',
      '#INTERPERSONAL-item-expand',
      '#label-INTERPERSONAL-0',
      '#INTERPERSONALCheckbox',
      '#INTERPERSONAL-item-expand',
      '#NATURAL_SUPPORTS-item-expand',
      '#label-NATURAL_SUPPORTS-0',
      '#NATURAL_SUPPORTSCheckbox',
      '#NATURAL_SUPPORTS-item-expand',
      '#RESILIENCY-item-expand',
      '#label-RESILIENCY-0',
      '#RESILIENCYCheckbox',
      '#RESILIENCY-item-expand',
      '#RELATIONSHIP_PERMANENCE-item-expand',
      '#label-RELATIONSHIP_PERMANENCE-0',
      '#RELATIONSHIP_PERMANENCECheckbox',
      '#RELATIONSHIP_PERMANENCE-item-expand',
      '#PLAYFULLNESS-item-expand',
      '#label-PLAYFULLNESS-0',
      '#PLAYFULLNESSCheckbox',
      '#PLAYFULLNESS-item-expand',
      '#FAMILY_SPRITUAL_RELIGIOUS-item-expand',
      '#label-FAMILY_SPRITUAL_RELIGIOUS-0',
      '#FAMILY_SPRITUAL_RELIGIOUSCheckbox',
      '#FAMILY_SPRITUAL_RELIGIOUS-item-expand'
    ]
    strengths_domain.each { |element| find(element).click }
  end

  def fetch_dyadic_domain
    dyadic_domain = [
      '#domain10-expand',
      '#CAREGIVER_EMOTIONAL_RESPONSIVENESS-item-expand',
      '#label-CAREGIVER_EMOTIONAL_RESPONSIVENESS-0',
      '#CAREGIVER_EMOTIONAL_RESPONSIVENESSCheckbox',
      '#CAREGIVER_EMOTIONAL_RESPONSIVENESS-item-expand',
      '#CAREGIVER_ADJ_TRAUMA_EXP-item-expand',
      '#label-CAREGIVER_ADJ_TRAUMA_EXP-0',
      '#CAREGIVER_ADJ_TRAUMA_EXPCheckbox',
      '#CAREGIVER_ADJ_TRAUMA_EXP-item-expand'
    ]
    dyadic_domain.each { |element| find(element).click }
  end

  def fetch_caregiver_resources_domain
    caregiver_resources_domain = [
      '#domain11-expand',
      '#SUPERVISION-item-expand',
      '#label-SUPERVISION-0',
      '#SUPERVISIONCheckbox',
      '#SUPERVISION-item-expand',
      '#INVOLVEMENT_WITH_CARE-item-expand',
      '#label-INVOLVEMENT_WITH_CARE-0',
      '#INVOLVEMENT_WITH_CARECheckbox',
      '#INVOLVEMENT_WITH_CARE-item-expand',
      '#KNOWLEDGE-item-expand',
      '#label-KNOWLEDGE-0',
      '#KNOWLEDGECheckbox',
      '#KNOWLEDGE-item-expand',
      '#SOCIAL_RESOURCES-item-expand',
      '#label-SOCIAL_RESOURCES-0',
      '#SOCIAL_RESOURCESCheckbox',
      '#SOCIAL_RESOURCES-item-expand',
      '#RESIDENT_STABILITY-item-expand',
      '#label-RESIDENT_STABILITY-0',
      '#RESIDENT_STABILITYCheckbox',
      '#RESIDENT_STABILITY-item-expand',
      '#MEDICAL_PHYSICAL_CAREGIVER-item-expand',
      '#label-MEDICAL_PHYSICAL_CAREGIVER-0',
      '#MEDICAL_PHYSICAL_CAREGIVERCheckbox',
      '#MEDICAL_PHYSICAL_CAREGIVER-item-expand',
      '#MENTAL_HEALTH-item-expand',
      '#label-MENTAL_HEALTH-0',
      '#MENTAL_HEALTHCheckbox',
      '#MENTAL_HEALTH-item-expand',
      '#SUBSTANCE_USE_CAREGIVER-item-expand',
      '#label-SUBSTANCE_USE_CAREGIVER-0',
      '#SUBSTANCE_USE_CAREGIVERCheckbox',
      '#SUBSTANCE_USE_CAREGIVER-item-expand',
      '#DEVELOPMENTAL-item-expand',
      '#label-DEVELOPMENTAL-0',
      '#DEVELOPMENTALCheckbox',
      '#DEVELOPMENTAL-item-expand',
      '#SAFETY-item-expand',
      '#label-SAFETY-0',
      '#SAFETYCheckbox',
      '#SAFETY-item-expand',
      '#FAMILY_RELATIONSHIP_TO_SYSTEM-item-expand',
      '#label-FAMILY_RELATIONSHIP_TO_SYSTEM-0',
      '#FAMILY_RELATIONSHIP_TO_SYSTEMCheckbox',
      '#FAMILY_RELATIONSHIP_TO_SYSTEM-item-expand',
      '#LEGAL_INVOLVEMENT-item-expand',
      '#label-LEGAL_INVOLVEMENT-0',
      '#LEGAL_INVOLVEMENTCheckbox',
      '#LEGAL_INVOLVEMENT-item-expand',
      '#ORGANIZATION-item-expand',
      '#label-ORGANIZATION-0',
      '#ORGANIZATIONCheckbox',
      '#ORGANIZATION-item-expand'
    ]
    caregiver_resources_domain.each { |element| find(element).click }
  end

  def fetch_minor_traumatic_domain
    traumatic_domain = [
      '#domain12-expand',
      '#SEXUAL_ABUSE-item-expand',
      '#label-SEXUAL_ABUSE-0',
      '#SEXUAL_ABUSECheckbox',
      '#SEXUAL_ABUSE-item-expand',
      '#PHYSICAL_ABUSE-item-expand',
      '#label-PHYSICAL_ABUSE-0',
      '#PHYSICAL_ABUSECheckbox',
      '#PHYSICAL_ABUSE-item-expand',
      '#EMOTIONAL_ABUSE-item-expand',
      '#label-EMOTIONAL_ABUSE-0',
      '#EMOTIONAL_ABUSECheckbox',
      '#EMOTIONAL_ABUSE-item-expand',
      '#NEGLECT-item-expand',
      '#label-NEGLECT-0',
      '#NEGLECTCheckbox',
      '#NEGLECT-item-expand',
      '#MEDICAL_TRAUMA-item-expand',
      '#label-MEDICAL_TRAUMA-0',
      '#MEDICAL_TRAUMACheckbox',
      '#MEDICAL_TRAUMA-item-expand',
      '#WITNESS_FAMILY_VIOLENCE-item-expand',
      '#label-WITNESS_FAMILY_VIOLENCE-0',
      '#WITNESS_FAMILY_VIOLENCECheckbox',
      '#WITNESS_FAMILY_VIOLENCE-item-expand',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCE-item-expand',
      '#label-WITNESS_COMMUNITY_SCHOOL_VIOLENCE-0',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCECheckbox',
      '#WITNESS_COMMUNITY_SCHOOL_VIOLENCE-item-expand',
      '#NATURAL_MANMADE_DISASTER-item-expand',
      '#label-NATURAL_MANMADE_DISASTER-0',
      '#NATURAL_MANMADE_DISASTERCheckbox',
      '#NATURAL_MANMADE_DISASTER-item-expand',
      '#WAR_TERRORISM_AFFECTED-item-expand',
      '#label-WAR_TERRORISM_AFFECTED-0',
      '#WAR_TERRORISM_AFFECTEDCheckbox',
      '#WAR_TERRORISM_AFFECTED-item-expand',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITY-item-expand',
      '#label-VICTIM_WITNESS_CRIMINAL_ACTIVITY-0',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITYCheckbox',
      '#VICTIM_WITNESS_CRIMINAL_ACTIVITY-item-expand',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSES-item-expand',
      '#label-DISRUPTIONS_CG_ATTACHMENT_LOSSES-0',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSESCheckbox',
      '#DISRUPTIONS_CG_ATTACHMENT_LOSSES-item-expand',
      '#CG_CRIMINAL_BEHAVIOR-item-expand',
      '#label-CG_CRIMINAL_BEHAVIOR-0',
      '#CG_CRIMINAL_BEHAVIORCheckbox',
      '#CG_CRIMINAL_BEHAVIOR-item-expand'
    ]
    traumatic_domain.each { |element| find(element).click }
  end
end
