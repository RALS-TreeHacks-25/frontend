import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../components/Colors';
import { getJournal } from '../components/FunctionCalls';

export default function Annotated({ navigation, route }) {
  const { journalId } = route.params;
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournal = async () => {
      const journal = await getJournal(journalId);
      setJournal(journal);
    };
    fetchJournal();
  }, [journalId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon 
          icon={faChevronLeft} 
          size={25} 
          color="black" 
          style={{marginLeft: '5%'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Journal Entry</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.journalText}>
          {journal.text}
        </Text>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: '5%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: '5%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '10%',
  },
  journalText: {
    fontSize: 18,
    color: Colors.primaryDark,
    lineHeight: 24,
    fontFamily: "Inconsolata-Regular",
  }
});
