import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Colors from '../components/Colors';

export default function NewNote() {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faChevronLeft} size={25} color="black" style={{marginLeft: '5%', marginTop: '15%'}}/>

      <TextInput
        placeholder="Title"
        style={{fontFamily: "Inconsolata-Regular", fontSize: 18, marginLeft: '10%', marginTop: '10%', color: Colors.black}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});