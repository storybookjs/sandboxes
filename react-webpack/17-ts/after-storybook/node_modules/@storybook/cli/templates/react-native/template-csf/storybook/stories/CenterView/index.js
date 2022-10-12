import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import style from './style';

export default function CenterView({ label }) {
  return <View style={style.main}>{label}</View>;
}

CenterView.defaultProps = {
  label: null,
};

CenterView.propTypes = {
  label: PropTypes.node,
};
