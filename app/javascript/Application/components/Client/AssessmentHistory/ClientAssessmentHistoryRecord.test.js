import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'
import {
  assessmentInProgressWithCaseNumber,
  assessmentCompletedWithCaseNumber,
  assessmentWithNoUpdateInfoWithCaseNumber,
  assessmentInProgressWithReferralNumber,
  assessmentCompletedWithReferralNumber,
  assessmentWithNoUpdateInfoWithReferralNumber,
  assessmentInProgressWithNoClientandReferralNumber,
  assessmentCompletedWithNoClientandReferralNumber,
  assessmentWithNoUpdateInfoWithNoClientandReferralNumber,
} from '../../Assessment/assessment.mocks.test'
import { navigation } from '../../../util/constants'

const getShallowWrapper = assessment =>
  shallow(<ClientAssessmentHistoryRecord assessment={assessment} navFrom={navigation.CHILD_PROFILE} />)

describe('ClientAssessmentHistoryWithCaseNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithCaseNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithCaseNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithCaseNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})

describe('ClientAssessmentHistoryWithReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})

describe('ClientAssessmentHistoryWithNoClientorReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithNoClientandReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithNoClientandReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithNoClientandReferralNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})
