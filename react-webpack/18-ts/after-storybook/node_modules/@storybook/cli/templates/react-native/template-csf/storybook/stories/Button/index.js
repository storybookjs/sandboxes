import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export default function Button({ onPress, label }) {
  return <TouchableHighlight onPress={onPress}>{label}</TouchableHighlight>;
}

Button.defaultProps = {
  label: null,
  onPress: () => {},
};

Button.propTypes = {
  label: PropTypes.node,
  onPress: PropTypes.func,
};
