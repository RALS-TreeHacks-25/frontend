import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faChevronLeft, faHexagonNodes } from '@fortawesome/free-solid-svg-icons'

import { PurpleButton } from '../components/Button'
import { createJournal } from '../components/FunctionCalls'

import * as Colors from '../components/Colors'

export default function NewNote({ navigation, route }) {
  const { uid } = route.params;
  const [journalText, setJournalText] = useState('');

  const handleAnalyze = () => {
    createJournal(uid, journalText)
  }

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faChevronLeft} size={25} color="black" style={{marginLeft: '5%', marginTop: '15%'}}/>

      <TextInput
        placeholder="dump your thoughts..."
        multiline={true}
        textAlignVertical="top"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={(text) => setJournalText(text)}
        scrollEnabled={true}
        style={{
          fontFamily: "Inconsolata-Regular", 
          fontSize: 18,
          marginLeft: '10%',
          marginTop: '10%',
          color: Colors.primaryDark,
          width: '80%',
          height: '65%',
          textAlignVertical: 'top',
        }}
      />

      <View style={styles.buttonContainer}>
        <PurpleButton title="analyze" width={'60%'} onPress={() => handleAnalyze()} icon={faHexagonNodes} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    alignItems: 'center',
  },
});