import React from 'react';
import PropTypes from 'prop-types';
import Genders from '../../enums/Genders';

const GenderRaceAndEthnicity = ({ gender, races, ethnicity }) => {
  const racesText = races && races.map(({ race }) => race);
  const origin = ethnicity && ethnicity.hispanic_latino_origin;
  const ethnicityValue = origin === 'Yes' ? 'Hispanic/Latino' : null;
  const genderRaceAndEthnicity = [Genders[gender]]
    .concat(racesText, ethnicityValue)
    .filter(Boolean)
    .join(', ');
  return genderRaceAndEthnicity ? <div>{genderRaceAndEthnicity}</div> : null;
};
GenderRaceAndEthnicity.defaultProps = {
  ethnicity: {},
  gender: '',
  races: [],
};
GenderRaceAndEthnicity.propTypes = {
  ethnicity: PropTypes.object,
  gender: PropTypes.string,
  races: PropTypes.array,
};

export default GenderRaceAndEthnicity;
