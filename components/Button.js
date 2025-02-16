import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Colors from './Colors';

export const PurpleButton = ({ title, onPress, backgroundColor, color, width, height, marginTop, marginLeft, marginRight, marginBottom }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={[purpleStyles.button, { width: purpleStyles.button.width, height: purpleStyles.button.height, marginTop: marginTop, marginLeft: marginLeft, marginRight: marginRight, marginBottom: marginBottom}]} onPress={onPress}>
      <Text style={[purpleStyles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const WhiteButton = ({ title, onPress, backgroundColor, color, width, height, marginTop, marginLeft, marginRight, marginBottom }) => {
    return (
      <TouchableOpacity activeOpacity={0.85} style={[whiteStyles.button, { width: whiteStyles.button.width, height: whiteStyles.button.height, marginTop: marginTop, marginLeft: marginLeft, marginRight: marginRight, marginBottom: marginBottom}]} onPress={onPress}>
        <Text style={[whiteStyles.buttonText]}>{title}</Text>
      </TouchableOpacity>
    );
  };

const purpleStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 60,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: "Inconsolata-Regular",
  },
});

const whiteStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 60,
  },
  buttonText: {
    color: Colors.primaryDark,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: "Inconsolata-Regular",
  },
});