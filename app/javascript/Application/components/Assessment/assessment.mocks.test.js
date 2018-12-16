import { childInfoJson } from '../Client/Client.helper.test'
import { getCurrentIsoDate } from '../../util/dateHelper'

export const initialAssessment = {
  instrument_id: 1,
  person: childInfoJson,
  county: childInfoJson.county,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  has_caregiver: true,
  state: {
    id: 0,
    domains: [
      {
        id: 0,
        code: 'string',
        underSix: false,
        aboveSix: false,
      },
    ],
  },
  event_date: getCurrentIsoDate(),
}

export const assessment = {
  id: 1,
  instrument_id: 1,
  person: childInfoJson,
  county: childInfoJson.county,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  has_caregiver: false,
  state: {
    under_six: false,
    caregiver_domain_template: {
      id: '6',
      code: 'CGV',
      is_caregiver_domain: true,
      items: [
        {
          code: '1',
        },
      ],
    },
    domains: [
      {
        id: 0,
        code: '123',
        items: [
          {
            above_six_id: '1',
            code: '1',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE_CAREGIVER',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'EXPOSURE',
            confidential: false,
            confidential_by_default: true,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
        ],
        underSix: true,
        aboveSix: true,
      },
    ],
  },
  event_date: '2018-06-11',
}

export const updatedAssessmentWithDomains = {
  id: 1,
  instrument_id: 1,
  person: childInfoJson,
  county: childInfoJson.county,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  has_caregiver: false,
  state: {
    under_six: false,
    caregiver_domain_template: {
      id: '6',
      code: 'CGV',
      is_caregiver_domain: true,
      items: [
        {
          code: '1',
        },
      ],
    },
    domains: [
      {
        id: 0,
        code: '123',
        caregiver_index: 'a',
        items: [
          {
            above_six_id: '1',
            code: '1',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE_CAREGIVER',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'EXPOSURE',
            confidential: false,
            confidential_by_default: true,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
        ],
        underSix: true,
        aboveSix: true,
      },
    ],
  },
  event_date: '2018-06-11',
}

export const updatedAssessmentDomains = [
  {
    id: 0,
    code: '123',
    caregiver_index: 'a',
    items: [
      {
        above_six_id: '1',
        code: '1',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE_CAREGIVER',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'EXPOSURE',
        confidential: false,
        confidential_by_default: true,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
    ],
    underSix: true,
    aboveSix: true,
  },
]

export const domainWithTwoCaregiver = [
  {
    id: 0,
    code: '123',
    caregiver_index: 'a',
    is_caregiver_domain: true,
    items: [
      {
        above_six_id: '1',
        code: '1',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE_CAREGIVER',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'EXPOSURE',
        confidential: false,
        confidential_by_default: true,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
    ],
    underSix: true,
    aboveSix: true,
  },
  {
    id: 1,
    code: 'abc',
    caregiver_index: 'b',
    is_caregiver_domain: true,
    items: [
      {
        above_six_id: '1',
        code: '1',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'SUBSTANCE_USE_CAREGIVER',
        confidential: false,
        confidential_by_default: false,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
      {
        above_six_id: '2',
        code: 'EXPOSURE',
        confidential: false,
        confidential_by_default: true,
        rating: 1,
        rating_type: 'REGULAR',
        required: true,
        under_six_id: 'EC01',
      },
    ],
    underSix: true,
    aboveSix: true,
  },
]

export const updatedAssessment = {
  id: 1,
  instrument_id: 1,
  person: childInfoJson,
  county: childInfoJson.county,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  state: {
    id: 0,
    under_six: true,
    domains: [
      {
        id: 0,
        code: '456',
        underSix: false,
        aboveSix: true,
      },
      {
        id: 1,
        code: '780',
        underSix: false,
        aboveSix: true,
      },
    ],
  },
  event_date: '2018-06-11',
}

export const instrument = {
  id: 1,
  prototype: {
    id: 0,
    domains: [
      {
        id: 0,
        code: 'string',
        underSix: false,
        aboveSix: false,
      },
    ],
  },
}

export const i18n = {
  '10._description_': 'Child youth relationship',
  '10._rating_.1._description_': 'Identified need requires monitoring',
  '10._rating_.2._description_': 'Action or intervention is required',
  '10._rating_.3._description_': 'Problems are dangerous',
}

export const client = {
  first_name: 'John',
  last_name: 'Doe',
}

export const assessmentPrint = {
  id: 55000,
  instrument_id: 1,
  person: {
    id: 50001,
    person_role: 'CLIENT',
    first_name: 'Hello',
    middle_name: '',
    last_name: 'World',
    suffix: '',
    external_id: '5467-3456-5473-4573457',
    dob: '2018-08-06',
    county: { id: 20, name: 'Madera', external_id: '1087', export_id: '20' },
    cases: [
      {
        id: 52500,
        external_id: '4356-234-6234-67234734',
        created_by: {
          id: 50000,
          person_role: 'USER',
          first_name: 'John',
          last_name: 'Doe',
          external_id: 'TESTPA',
          cases: [],
        },
        created_timestamp: '2018-08-31T11:34:05.631Z',
      },
    ],
  },
  county: { id: 20, name: 'Madera', external_id: '1087', export_id: '20' },
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  has_caregiver: true,
  event_date: '2018-08-31',
  updated_by: {
    id: 50000,
    person_role: 'USER',
    first_name: 'John',
    last_name: 'Doe',
    external_id: 'TESTPA',
    cases: [],
  },
  state: {
    under_six: false,
    domains: [
      {
        id: 1,
        code: 'BEN',
        under_six: false,
        above_six: true,
        is_caregiver_domain: false,
        comment: 'This is a domain comment',
        items: [
          {
            under_six_id: '',
            above_six_id: '1',
            code: 'PSYCHOSIS',
            required: true,
            confidential: true,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 1,
            comment:
              'A long comment with 250 symbols: Eh bien, mon prince. Gênes et Lucques ne sont plus que des apanages, des поместья, de la famille Buonaparte. Non, je vous previens, que si vous ne me dites pas, que nous avons la guerre, si vous vous permettez encore',
          },
          {
            under_six_id: '',
            above_six_id: '2',
            code: 'IMPULSIVITY_HYPERACTIVITY',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 2,
            comment: 'A short one',
          },
          {
            under_six_id: '',
            above_six_id: '3',
            code: 'DEPRESSION',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 1,
          },
        ],
      },
      {
        id: 6,
        code: 'CGV',
        under_six: true,
        above_six: true,
        is_caregiver_domain: true,
        caregiver_index: 'a',
        items: [
          {
            under_six_id: 'EC34',
            above_six_id: '41',
            code: 'SUPERVISION',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 0,
          },
          {
            under_six_id: 'EC35',
            above_six_id: '42',
            code: 'INVOLVEMENT_WITH_CARE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: -1,
          },
          {
            under_six_id: 'EC36',
            above_six_id: '43',
            code: 'KNOWLEDGE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: -1,
          },
        ],
      },
      {
        id: 6,
        code: 'CGV',
        under_six: true,
        above_six: true,
        is_caregiver_domain: true,
        caregiver_index: 'b',
        items: [
          {
            under_six_id: 'EC34',
            above_six_id: '41',
            code: 'SUPERVISION',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 1,
          },
          {
            under_six_id: 'EC35',
            above_six_id: '42',
            code: 'INVOLVEMENT_WITH_CARE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: -1,
          },
          {
            under_six_id: 'EC36',
            above_six_id: '43',
            code: 'KNOWLEDGE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: -1,
          },
        ],
      },
      {
        id: 7,
        code: 'TRM',
        under_six: true,
        above_six: true,
        is_caregiver_domain: false,
        items: [
          {
            under_six_id: 'T01',
            above_six_id: 'T01',
            code: 'SEXUAL_ABUSE',
            required: true,
            confidential: true,
            confidential_by_default: false,
            rating_type: 'BOOLEAN',
            has_na_option: false,
            rating: -1,
          },
          {
            under_six_id: 'T02',
            above_six_id: 'T02',
            code: 'PHYSICAL_ABUSE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'BOOLEAN',
            has_na_option: false,
            rating: 1,
          },
          {
            under_six_id: 'T03',
            above_six_id: 'T03',
            code: 'EMOTIONAL_ABUSE',
            required: true,
            confidential: false,
            confidential_by_default: false,
            rating_type: 'BOOLEAN',
            has_na_option: false,
            rating: 0,
          },
        ],
      },
    ],
  },
}

export const assessmentWithConfidentialItem = {
  id: 55000,
  instrument_id: 1,
  person: {
    id: 50001,
    person_role: 'CLIENT',
    first_name: 'Hello',
    middle_name: '',
    last_name: 'World',
    suffix: '',
    external_id: '5467-3456-5473-4573457',
    dob: '2018-08-06',
    county: { id: 20, name: 'Madera', external_id: '1087', export_id: '20' },
  },
  county: { id: 20, name: 'Madera', external_id: '1087', export_id: '20' },
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  has_caregiver: true,
  event_date: '2018-08-31',
  updated_by: {
    id: 50000,
    person_role: 'USER',
    first_name: 'John',
    last_name: 'Doe',
    external_id: 'TESTPA',
    cases: [],
  },
  state: {
    under_six: false,
    domains: [
      {
        id: 1,
        code: 'BEN',
        under_six: false,
        above_six: true,
        is_caregiver_domain: false,
        comment: 'This domain comment is not supposed to be printed',
        items: [
          {
            under_six_id: '',
            above_six_id: '1',
            code: 'PSYCHOSIS',
            required: true,
            confidential: true,
            confidential_by_default: true,
            rating_type: 'REGULAR',
            has_na_option: false,
            rating: 1,
            comment: 'This item comment is not supposed to be printed',
          },
        ],
      },
    ],
  },
}

export const i18nPrint = {
  'BEN._description_':
    "The ratings in this section identify the behavioral health needs of the youth. While the CANS is not a diagnostic tool, it is designed to be consistent with diagnostic communication. In the DSM, a diagnosis is defined by a set of symptoms that is associated with either dysfunction or distress. This is consistent with the ratings of '2' or '3' as described by the action levels below.",
  'BEN._rating_.0._description_': 'No current need; no need for action or intervention.',
  'BEN._rating_.1._description_':
    'History or suspicion of problems; requires monitoring, watchful waiting, or preventive activities.',
  'BEN._rating_.2._description_':
    'Problem is interfering with functioning; requires action or intervention to ensure that the need is addressed.',
  'BEN._rating_.3._description_': 'Problems are dangerous or disabling; requires immediate and/or intensive action.',
  'BEN._title_': 'BEHAVIORAL/EMOTIONAL NEEDS DOMAIN',
  'BEN._to_consider_.0': 'What are the presenting social, emotional, and behavioral needs of the child/youth?',
  'CGV._description_':
    'This section focuses on the strengths and needs of the caregiver. Caregiver ratings should be completed by household. If multiple households are involved in the planning, then this section should be completed once for each household under consideration. If the child or youth is in a foster care or out-of-home placement, please rate the identified parent(s), other relative(s), adoptive parent(s), or caretaker(s) who is planning to assume custody and/or take responsibility for the care of this child/youth.',
  'CGV._rating_.0._description_':
    'No current need; no need for action or intervention. This may be a strength of the caregiver.',
  'CGV._rating_.1._description_':
    'History or suspicion of problems; requires monitoring, watchful waiting, or preventive activities. This may be an opportunity for strength building.',
  'CGV._rating_.2._description_':
    'Problem is interfering with functioning; requires action or intervention to ensure that the need is addressed.',
  'CGV._rating_.3._description_': 'Problems are dangerous or disabling; requires immediate and/or intensive action.',
  'CGV._title_': 'CAREGIVER RESOURCES AND NEEDS DOMAIN',
  'CGV._to_consider_.0': "What are the resources and needs of the child/youth's caregiver(s)?",
  'CGV._to_consider_.1': "How are these needs impacting the caregiver's ability to provide care to the child/youth?",
  'DEPRESSION._description_':
    'Symptoms included in this item are irritable or depressed mood, social withdrawal, sleep disturbances, weight/eating disturbances, and loss of motivation, interest or pleasure in daily activities. This item can be used to rate symptoms of the depressive disorders as specified in DSM-5.',
  'DEPRESSION._rating_.0._description_':
    'No current need; no need for action or intervention. No evidence of problems with depression.',
  'DEPRESSION._rating_.1._description_':
    'Identified need requires monitoring, watchful waiting, or preventive activities. History or suspicion of depression or evidence of depression associated with a recent negative life event with minimal impact on life domain functioning. Brief duration of depression, irritability, or impairment of peer, family, or academic functioning that does not lead to pervasive avoidance behavior.',
  'DEPRESSION._rating_.2._description_':
    "Action or intervention is required to ensure that the identified need is addressed; need is interfering with functioning. Clear evidence of depression associated with either depressed mood or significant irritability. Depression has interfered significantly in child/youth's ability to function in at least one life domain.",
  'DEPRESSION._rating_.3._description_':
    'Problems are dangerous or disabling; requires immediate and/or intensive action. Clear evidence of disabling level of depression that makes it virtually impossible for the child/youth to function in any life domain. This rating is given to a child/youth with a severe level of depression. This would include a child/youth who stays at home or in bed all day due to depression or one whose emotional symptoms prevent any participation in school, friendship groups, or family life. Disabling forms of depressive diagnoses would be rated here.',
  'DEPRESSION._title_': 'Depression',
  'DEPRESSION._to_consider_.0':
    'Is the child/youth concerned about possible depression or chronic low mood and irritability?',
  'DEPRESSION._to_consider_.1': 'Has the child/youth withdrawn from normal activities?',
  'DEPRESSION._to_consider_.2': 'Does the child/youth seem lonely or not interested in others?',
  'EMOTIONAL_ABUSE._description_':
    'This item describes whether or not the child/youth has experienced verbal and/or nonverbal emotional abuse, including belittling, shaming, and humiliating a child/youth, calling names, making negative comparisons to others, or telling a child/youth that they are, "no good". This item includes both "emotional abuse", which would include psychological maltreatment such as insults or humiliation towards a child and "emotional neglect", described as the denial of emotional attention and/or support from caregivers.',
  'EMOTIONAL_ABUSE._rating_.0._description_': 'There is no evidence that child/youth has experienced emotional abuse.',
  'EMOTIONAL_ABUSE._rating_.1._description_':
    'Child/youth has experienced emotional abuse, or there is a suspicion that they have experienced emotional abuse (mild to severe, for any length of time) including: insults or occasionally being referred to in a derogatory manner by caregivers, being denied emotional attention or completely ignored, or threatened/terrorized by others.',
  'EMOTIONAL_ABUSE._title_': 'Emotional Abuse',
  'EMOTIONAL_ABUSE._to_consider_.0': 'How does the caregiver talk to/interact with the child/youth?',
  'EMOTIONAL_ABUSE._to_consider_.1': 'Is there name calling or shaming in the home?',
  'IMPULSIVITY_HYPERACTIVITY._description_':
    'Problems with impulse control and impulsive behaviors, including motoric disruptions, are rated here. This includes behavioral symptoms associated with Attention-Deficit Hyperactivity Disorder (ADHD), Impulse-Control Disorders and mania as indicated in the DSM-5. Children/youth with impulse problems tend to engage in behavior without thinking, regardless of the consequences. This can include compulsions to engage in gambling, violent behavior (e.g., road rage), and sexual behavior, fire-starting or stealing.',
  'IMPULSIVITY_HYPERACTIVITY._rating_.0._description_':
    'No current need; no need for action or intervention. No evidence of symptoms of loss of control of behavior.',
  'IMPULSIVITY_HYPERACTIVITY._rating_.1._description_':
    "Identified need requires monitoring, watchful waiting, or preventive activities. There is a history or evidence of mild levels of impulsivity evident in action or thought that place the child/youth at risk of future functioning difficulties. The child/youth may exhibit limited impulse control, e.g., child/youth may yell out answers to questions or may have difficulty waiting one's turn. Some motor difficulties may be present as well, such as pushing or shoving others.",
  'IMPULSIVITY_HYPERACTIVITY._rating_.2._description_':
    "Action or intervention is required to ensure that the identified need is addressed; need is interfering with functioning. Clear evidence of problems with impulsive, distractible, or hyperactive behavior that interferes with the child/youth's functioning in at least one life domain. This indicates a child/youth with impulsive behavior who may represent a significant management problem for adults (e.g., caregivers, teachers, coaches, etc.). A child/youth who often intrudes on others and often exhibits aggressive impulses would be rated here.",
  'IMPULSIVITY_HYPERACTIVITY._rating_.3._description_':
    'Problems are dangerous or disabling; requires immediate and/or intensive action. Clear evidence of a dangerous level of hyperactivity and/or impulsive behavior that places the child/youth at risk of physical harm. This indicates a child/youth with frequent and significant levels of impulsive behavior that carries considerable safety risk (e.g., running into the street, dangerous driving or bike riding). The child/youth may be impulsive on a nearly continuous basis. The youth endangers self or others without thinking.',
  'IMPULSIVITY_HYPERACTIVITY._title_': 'Impulsivity/Hyperactivity',
  'IMPULSIVITY_HYPERACTIVITY._to_consider_.0': 'Is the child/youth unable to sit still for any length of time?',
  'IMPULSIVITY_HYPERACTIVITY._to_consider_.1':
    'Does the child/youth have trouble paying attention for more than a few minutes?',
  'IMPULSIVITY_HYPERACTIVITY._to_consider_.2': 'Is the child/youth able to control their behavior, talking, etc.?',
  'KNOWLEDGE._description_':
    "This item identifies the caregiver's knowledge of the child/youth's strengths and needs, any problems experienced by the child/youth, and his/her ability to understand the rationale for the treatment or management of these problems.",
  'KNOWLEDGE._rating_.0._description_':
    "No current need; no need for action or intervention. This may be a strength of the caregiver. Caregiver is fully knowledgeable about the child/youth's psychological strengths and weaknesses, talents and limitations.",
  'KNOWLEDGE._rating_.1._description_':
    "Identified need requires monitoring, watchful waiting, or preventive activities. This may be an opportunity for strength building. Caregiver, while being generally knowledgeable about the child/youth, has some mild deficits in knowledge or understanding of the child/youth's psychological condition or their talents, skills and assets.",
  'KNOWLEDGE._rating_.2._description_':
    "Action or intervention is required to ensure that the identified need is addressed; need is interfering with functioning. Caregiver does not know or understand the youth well and significant deficits exist in the caregiver's ability to relate to the youth's problems and strengths.",
  'KNOWLEDGE._rating_.3._description_':
    "Problems are dangerous or disabling; requires immediate and/or intensive action. Caregiver has little or no understanding of the child/youth's current condition. Their lack of knowledge about the child/youth's strengths and needs places the child/youth at risk of significant negative outcomes.",
  'KNOWLEDGE._title_': 'Knowledge',
  'KNOWLEDGE._to_consider_.0': "How does the caregiver understand the child/youth's needs?",
  'KNOWLEDGE._to_consider_.1': "Does the caregiver have the necessary information to meet the child/youth's needs?",
  'PHYSICAL_ABUSE._description_': 'This item describes whether or not the child/youth has experienced physical abuse.',
  'PHYSICAL_ABUSE._rating_.0._description_':
    'There is no evidence that the child/youth has experienced physical abuse.',
  'PHYSICAL_ABUSE._rating_.1._description_':
    'Child/youth has experienced or there is a suspicion that they experienced physical abuse - mild to severe, or repeated physical abuse with sufficient physical harm requiring medical treatment.',
  'PHYSICAL_ABUSE._title_': 'Physical Abuse',
  'PHYSICAL_ABUSE._to_consider_.0': 'Is physical discipline used in the home? What forms?',
  'PHYSICAL_ABUSE._to_consider_.1': 'Has the child/youth ever received bruises, marks, or injury from discipline?',
  'PSYCHOSIS._description_':
    'This item rates the symptoms of psychiatric disorders with a known neurological base, including schizophrenia spectrum and other psychotic disorders. The common symptoms of these disorders include hallucinations (i.e. experiencing things others do not experience), delusions (i.e. a false belief or an incorrect inference about reality that is firmly sustained despite the fact that nearly everybody thinks the belief is false or proof exists of its inaccuracy), disorganized thinking, and bizarre/idiosyncratic behavior.',
  'PSYCHOSIS._rating_.0._description_':
    'No current need; no need for action or intervention. No evidence of psychotic symptoms. Both thought processes and content are within normal range.',
  'PSYCHOSIS._rating_.1._description_':
    'Identified need requires monitoring, watchful waiting, or preventive activities. Evidence of disruption in thought processes or content. Child/youth may be somewhat tangential in speech or evidence somewhat illogical thinking (age-inappropriate). This also includes child/youth with a history of hallucinations but none currently. Use this category for child/youth who are below the threshold for one of the DSM diagnoses listed above.',
  'PSYCHOSIS._rating_.2._description_':
    "Action or intervention is required to ensure that the identified need is addressed; need is interfering with functioning. Evidence of disturbance in thought process or content that may be impairing the child/youth's functioning in at least one life domain. Child/youth may be somewhat delusional or have brief intermittent hallucinations. Speech may be at times quite tangential or illogical.",
  'PSYCHOSIS._rating_.3._description_':
    'Problems are dangerous or disabling; requires immediate and/or intensive action. Clear evidence of dangerous hallucinations, delusions, or bizarre behavior that might be associated with some form of psychotic disorder that places the child/youth or others at risk of physical harm.',
  'PSYCHOSIS._title_': 'Psychosis (Thought Disorder)',
  'PSYCHOSIS._to_consider_.0': 'Does the child/youth exhibit behaviors that are unusual or difficult to understand?',
  'PSYCHOSIS._to_consider_.1': 'Does the child/youth experience hallucinations or delusions, bizarre behavior?',
  'PSYCHOSIS._to_consider_.2':
    "Are the unusual behaviors, hallucinations or delusions interfering with the youth's functioning?",
  'SEXUAL_ABUSE._description_': 'This item describes whether or not the child/ youth has experienced sexual abuse.',
  'SEXUAL_ABUSE._rating_.0._description_': 'There is no evidence that the child/youth has experienced sexual abuse.',
  'SEXUAL_ABUSE._rating_.1._description_':
    'Child/youth has experienced sexual abuse, or there is a suspicion that they have experienced sexual abuse - including single or multiple episodes, or chronic over an extended period of time. The abuse may have involved penetration, multiple perpetrators, and/or associated physical injury. Child/youth with exposure to secondary sexual abuse (e.g., witnessing sexual abuse, having a sibling sexually abused) should be rated here.',
  'SEXUAL_ABUSE._title_': 'Sexual Abuse',
  'SEXUAL_ABUSE._to_consider_.0': 'Has the caregiver or child/youth disclosed sexual abuse?',
  'SEXUAL_ABUSE._to_consider_.1': 'Is there suspicion or evidence that the child/youth has been sexually abused?',
  'SUPERVISION._description_':
    "This item rates the caregiver's capacity to provide the level of monitoring and discipline needed by the child/youth. Discipline is defined in the broadest sense, and includes all of the things that parents/caregivers can do to promote positive behavior with their children.",
  'SUPERVISION._rating_.0._description_':
    'No current need; no need for action or intervention. This may be a strength of the caregiver. No evidence caregiver needs help or assistance in monitoring or disciplining the child/youth, and/or caregiver has good monitoring and discipline skills.',
  'SUPERVISION._rating_.1._description_':
    'Identified need requires monitoring, watchful waiting, or preventive activities. This may be an opportunity for strength building. Caregiver generally provides adequate supervision, but is inconsistent. Caregiver may need occasional help or assistance.',
  'SUPERVISION._rating_.2._description_':
    'Action or intervention is required to ensure that the identified need is addressed; need is interfering with functioning. Caregiver supervision and monitoring are very inconsistent and frequently absent. Caregiver needs assistance to improve supervision skills.',
  'SUPERVISION._rating_.3._description_':
    'Problems are dangerous or disabling; requires immediate and/or intensive action. Caregiver is unable to monitor or discipline the youth. Caregiver requires immediate and continuing assistance. Child/youth is at risk of harm due to absence of supervision or monitoring.',
  'SUPERVISION._title_': 'Supervision',
  'SUPERVISION._to_consider_.0':
    'How does the caregiver feel about their ability to keep an eye on and discipline the child/youth?',
  'SUPERVISION._to_consider_.1': 'Does the caregiver need some help with these issues?',
  'TRM._description_':
    "All of the potentially traumatic/adverse childhood experiences items are static indicators. In other words, these items indicate whether or not a child/youth has experienced a particular trauma. If the child/youth has ever had one of these experiences it would always be rated in this section, even if the experience was not currently causing problems or distress in the child/youth's life. Thus, these items are not expected to change except in the case that the child/youth has a new trauma experience or a historical trauma is identified that was not previously known.",
  'TRM._rating_.0._description_': 'No evidence of any trauma of this type.',
  'TRM._rating_.1._description_':
    'Child/youth has had experience or there is suspicion that the child/youth has experienced this type of trauma—one incident, multiple incidents, or chronic, on-going experiences.',
  'TRM._title_': 'POTENTIALLY TRAUMATIC / ADVERSE CHILDHOOD EXPERIENCES',
  'TRM._to_consider_.0': 'Has the child/youth experienced adverse life events that may impact his/her behavior?',
}

export const printFixture =
  '<div><div style="display:flex;flex-direction:column;border:thin solid gray;padding:1rem"><h1 style="text-align:center">CANS Assessment Form</h1><div style="display:flex;flex-direction:row;justify-content:space-between"><h2>World, Hello</h2><h2>Madera County</h2></div><div style="display:flex;flex-direction:row;margin:0.5rem 0 0.5rem 0;width:107%"><div style="display:flex;flex-direction:column;width:33%"><strong>Date</strong><span>08/31/2018</span></div><div style="display:flex;flex-direction:column;width:33%"><strong>Conducted by</strong><span></span></div><div style="display:flex;flex-direction:column;width:33%"><strong>Case/Referral Number</strong><span></span></div><div style="display:flex;flex-direction:column;width:33%"><strong>Complete as</strong><span>COMMUNIMETRIC</span></div></div><div style="display:flex;flex-direction:row;margin:0.5rem 0 0.5rem 0;width:107%"><div style="display:flex;flex-direction:column;width:33%"><strong>Child/Youth has Caregiver?</strong><div><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/>Yes<input type="radio" style="margin:0.2rem 0.2rem" readonly=""/>No</div></div><div style="display:flex;flex-direction:column;width:33%"><strong>Authorization for release of information on file?</strong><div><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/>Yes<input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/>No</div></div><div style="display:flex;flex-direction:column;width:33%"><strong>Age Template</strong><div><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/>0-5<input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/>6-21</div></div></div><div style="display:flex;align-items:center;justify-content:center;margin-bottom:0.5rem;margin-left:18rem"><strong>By selecting NO, Items 7, 48, and EC 41 (Substance Use Disorder Items) from this CANS assessment will be redacted when printed.</strong></div><span style="text-align:right;font-style:italic" /></div><div><div style="display:flex;flex-direction:column;justify-content:center;padding:0 1rem 0 1rem;margin:1rem 0 0 0;min-height:3rem;background-color:transparent;border:thin solid gray;page-break-inside:avoid;page-break-after:avoid"><div style="font-size:1rem;font-weight:500">BEHAVIORAL/EMOTIONAL NEEDS DOMAIN - (Domain Total Score: 4)</div><div style="font-size:0.8rem;font-style:italic;background-color:transparent;page-break-inside:avoid">Domain Comment: This is a domain comment</div></div><div style="border:thin solid gray"><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">1. Psychosis (Thought Disorder)</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" checked="" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div><div style="font-size:0.8rem;font-style:italic;align-self:center;width:90%;background-color:transparent;page-break-inside:avoid">Comment: A long comment with 250 symbols: Eh bien, mon prince. Gênes et Lucques ne sont plus que des apanages, des поместья, de la famille Buonaparte. Non, je vous previens, que si vous ne me dites pas, que nous avons la guerre, si vous vous permettez encore</div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">2. Impulsivity/Hyperactivity</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div><div style="font-size:0.8rem;font-style:italic;align-self:center;width:90%;background-color:transparent;page-break-inside:avoid">Comment: A short one</div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">3. Depression</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div></div></div><div><div style="display:flex;flex-direction:column;justify-content:center;padding:0 1rem 0 1rem;margin:1rem 0 0 0;min-height:3rem;background-color:transparent;border:thin solid gray;page-break-inside:avoid;page-break-after:avoid"><div style="font-size:1rem;font-weight:500">CAREGIVER RESOURCES AND NEEDS DOMAIN - (Domain Total Score: 0)</div></div><div style="border:thin solid gray"><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">41a. Supervision</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">42a. </div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">43a. Knowledge</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div></div></div><div><div style="display:flex;flex-direction:column;justify-content:center;padding:0 1rem 0 1rem;margin:1rem 0 0 0;min-height:3rem;background-color:transparent;border:thin solid gray;page-break-inside:avoid;page-break-after:avoid"><div style="font-size:1rem;font-weight:500">CAREGIVER RESOURCES AND NEEDS DOMAIN - (Domain Total Score: 1)</div></div><div style="border:thin solid gray"><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">41b. Supervision</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">42b. </div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">43b. Knowledge</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">0</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">1</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">2</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">3</span></div></div></div></div></div></div></div><div><div style="display:flex;flex-direction:column;justify-content:center;padding:0 1rem 0 1rem;margin:1rem 0 0 0;min-height:3rem;background-color:transparent;border:thin solid gray;page-break-inside:avoid;page-break-after:avoid"><div style="font-size:1rem;font-weight:500">POTENTIALLY TRAUMATIC / ADVERSE CHILDHOOD EXPERIENCES - (Domain Total Score: 1)</div></div><div style="border:thin solid gray"><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">T01. Sexual Abuse</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" checked="" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">No</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">Yes</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">T02. Physical Abuse</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">No</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">Yes</span></div></div></div></div></div><div style="display:flex;flex-direction:column;padding:0 1rem 0 1rem;background-color:transparent;border-bottom:thin solid gray;page-break-inside:avoid"><div style="display:flex;flex-direction:row;justify-content:flex-start;background-color:transparent;page-break-inside:avoid"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:1rem">T03. Emotional Abuse</div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Discretion Needed </div></div><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><input type="checkbox" readonly=""/></div></div><div style="display:flex;flex-direction:row"><div style="flex-grow:1;flex-shrink:1;display:flex;flex-direction:column;justify-content:center;margin:0.2rem 0.2rem"><div style="font-size:0.8rem;font-weight:400;text-align:center">Rating:</div></div><div style="display:flex;flex-direction:row"><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" checked="" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">No</span></div><div style="display:inline-flex;flex-direction:column"><input type="radio" style="margin:0.2rem 0.2rem" readonly=""/><span style="font-size:0.8rem;font-weight:400;text-align:center">Yes</span></div></div></div></div></div></div></div></div>'

export const assessmentInProgress = {
  id: 97500,
  person: {
    id: 1,
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  the_case: {
    external_id: '4444-333-4444-88888888',
  },
  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'Last_Name 1',
  },
  county: {
    name: 'Alameda',
  },
  conducted_by: 'John Dow',
}

export const assessmentCompleted = {
  id: 97500,
  person: { id: 1, identifier: 'B2yE2Ao0X6' },
  status: 'COMPLETED',
  the_case: {
    external_id: '4444-333-4444-88888888',
  },
  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'Last_Name 1',
  },
  county: {
    name: 'Alameda',
  },
  conducted_by: 'John Dow',
}

export const assessmentWithNoUpdateInfo = {
  id: 97502,
  person: {
    id: 1,
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'Last_Name 3',
  },
  county: {
    name: 'Alameda',
  },
  conducted_by: 'John Dow',
}

// Client with Case Number
export const assessmentInProgressWithCaseNumber = {
  id: 97501,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',

  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentCompletedWithCaseNumber = {
  id: 97502,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'COMPLETED',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentWithNoUpdateInfoWithCaseNumber = {
  id: 97503,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}

// Client with Referral Number
export const assessmentInProgressWithReferralNumber = {
  id: 97501,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',

  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentCompletedWithReferralNumber = {
  id: 97502,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'COMPLETED',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentWithNoUpdateInfoWithReferralNumber = {
  id: 97503,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}

// Client with No Client and Referral Number
export const assessmentInProgressWithNoClientandReferralNumber = {
  id: 97501,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '',
  service_source: '',
  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentCompletedWithNoClientandReferralNumber = {
  id: 97502,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'COMPLETED',
  service_source_ui_id: '',
  service_source: '',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

export const assessmentWithNoUpdateInfoWithNoClientandReferralNumber = {
  id: 97503,
  person: {
    id: 1,
    identifier: '123',
    first_name: 'Casey',
    middle_name: 'Middle',
    last_name: 'Test',
    suffix: 'Jr',
  },
  status: 'IN_PROGRESS',
  service_source_ui_id: '',
  service_source: '',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}
