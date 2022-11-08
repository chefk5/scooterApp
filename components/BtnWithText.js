import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default function BtnWithBg({ pressFunc, text }) {
  BtnWithBg.propTypes = {
    text: PropTypes.string,
    pressFunc: PropTypes.func,
  };

  return (
    <TouchableOpacity onPress={() => pressFunc()} style={styles.textBtn}>
      <Text style={styles.textBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBtnText: {
    color: '#3955aa',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textBtn: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
