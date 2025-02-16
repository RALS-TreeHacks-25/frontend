import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../components/Colors';
import { getJournal } from '../components/FunctionCalls';
import RBSheet from "react-native-raw-bottom-sheet"; // Import the bottom sheet package

export default function Annotated({ navigation, route }) {
  const { journalId } = route.params;
  const [journal, setJournal] = useState({ text: '', title: '' });
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);

  // Create a ref to control the bottom sheet.
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const fetchJournal = async () => {
      const journal = await getJournal(journalId);
      console.log("journal annotations: ", journal.annotations);
      setJournal(journal);
      setAnnotations(journal.annotations);
    };
    fetchJournal();
  }, [journalId]);

  // Helper function to render journal text with all key phrases highlighted.
  const renderHighlightedText = () => {
    if (!journal.text) return null;
    const fullText = journal.text;
    let intervals = [];

    // Find all occurrences of each annotation's keyPhrase.
    annotations.forEach((annotation) => {
      if (annotation.keyPhrase) {
        let startIndex = 0;
        while (true) {
          const index = fullText.indexOf(annotation.keyPhrase, startIndex);
          if (index === -1) break;
          intervals.push({
            start: index,
            end: index + annotation.keyPhrase.length,
            annotation: annotation,
          });
          startIndex = index + annotation.keyPhrase.length;
        }
      }
    });

    // Sort intervals so that they appear in order.
    intervals.sort((a, b) => a.start - b.start);

    let components = [];
    let currentIndex = 0;

    intervals.forEach((interval) => {
      // Skip if this interval overlaps with the previous one.
      if (interval.start < currentIndex) {
        return;
      }
      // Append any plain text before this highlighted segment.
      if (interval.start > currentIndex) {
        components.push(
          <Text key={`plain-${currentIndex}`}>
            {fullText.substring(currentIndex, interval.start)}
          </Text>
        );
      }
      // Select the highlight color based on annotation type.
      let backgroundColor;
      switch (interval.annotation.type) {
        case "connection":
          backgroundColor = "#8256F838"; // 15% opacity version of "#8256F8"
          break;
        case "question":
          backgroundColor = "#03B5AA38"; // fallback light pink
          break;
        case "action":
          backgroundColor = "#FFA20038"; // 15% opacity version of "#FFA200"
          break;
      }

      // Render the highlighted segment with extra horizontal padding.
      components.push(
        <Text
          key={`highlight-${interval.start}`}
          style={[styles.highlightedText, { backgroundColor, paddingHorizontal: 4 }]}
          onPress={() => {
            setCurrentAnnotation(interval.annotation);
            // Open the bottom drawer when a highlighted text is pressed.
            if (bottomSheetRef.current) {
              bottomSheetRef.current.open();
            }
          }}
        >
          {fullText.substring(interval.start, interval.end)}
        </Text>
      );
      currentIndex = interval.end;
    });

    // Append any text after the last highlight.
    if (currentIndex < fullText.length) {
      components.push(
        <Text key={`plain-end`}>
          {fullText.substring(currentIndex)}
        </Text>
      );
    }
    return components;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={25}
            color="black"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journal.title.toLowerCase()}
        </Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.journalText}>
          {renderHighlightedText()}
        </Text>
      </ScrollView>

      <StatusBar style="auto" />

      {/* Bottom drawer for annotation details */}
      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16
          }
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.sheetTitle}>Annotation Details</Text>
          {/* For now, simply display the current annotation's data */}
          {currentAnnotation ? (
            <Text style={styles.sheetContent}>
              {JSON.stringify(currentAnnotation, null, 2)}
            </Text>
          ) : (
            <Text>No annotation selected.</Text>
          )}
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: '20%',
    marginBottom: '5%',
    position: 'relative',
    width: '100%',
  },
  chevronIcon: {
    position: 'absolute',
    left: '5%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: "Inconsolata-Regular",
    textAlign: 'center',
    width: '70%',
    marginLeft: '15%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    marginTop: '3%',
    marginBottom: 30,
  },
  journalText: {
    fontSize: 18,
    color: Colors.primaryDark,
    lineHeight: 24,
    fontFamily: "Inconsolata-Regular",
  },
  highlightedText: {
    // This style is applied to each highlighted keyPhrase.
    paddingHorizontal: 4,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sheetContent: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
});