import { StatusBar } from 'expo-status-bar';
import React from 'react';

import * as Colors from '../components/Colors'
import { PurpleButton, WhiteButton } from '../components/Button';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';

export default function Landing({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} marginTop={'45%'} marginBottom={'10%'}>hey there</Text>
      <Text style={styles.subtitle} marginBottom={'0%'}>this is [perspective],</Text>
      <Text style={styles.subtitle} marginBottom={'30%'}>your cognition copilot</Text>

      <PurpleButton title="login" marginBottom={'7%'} onPress={() => navigation.navigate('Login', { uid: '123' })} />
      <WhiteButton title="sign up" marginBottom={'10%'} onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Inconsolata-Regular",
  },
  title: {
    fontSize: 40,
    // bold text
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: "Inconsolata-Regular",
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 600,
    color: Colors.secondary,
    marginTop: 10,
    fontFamily: "Inconsolata-Regular",
  }
});