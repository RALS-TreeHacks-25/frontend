import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Landing Page</Text>
      <Button title="Login" onPress={() => navigation.navigate('BottomTab', { uid: '123' })} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});