import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default function BtnWithBg({ pressFunc, text }) {
  BtnWithBg.propTypes = {
    text: PropTypes.string,
    pressFunc: PropTypes.func,
  };

  return (
    <TouchableOpacity onPress={() => pressFunc()} style={styles.btnWithBg}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnWithBg: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#cdd4e9',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtn: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
