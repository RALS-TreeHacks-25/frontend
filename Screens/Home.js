import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { getUser, getJourneys } from '../components/FunctionCalls';

import { useIsFocused } from '@react-navigation/native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as Colors from '../components/Colors'

export default function Home({ navigation, route }) {
  const { uid } = route.params;
  console.log("uid: ", uid);

  const [user, setUser] = useState({name: null, email: null, uid: null}) // TODO add params here
  const [carousel, setCarousel] = useState([])
  const [journeys, setJourneys] = useState([])

  const isFocusedMainPage = useIsFocused()

  useEffect(() => {
    if(isFocusedMainPage) {
      async function fetchData() {
        console.log("fetching data...")
  
        let userRes = await getUser(uid)
        console.log("userRes: ", userRes)
        setUser(userRes)

        // let carouselRes = await getCarousel()
        // setCarousel(carouselRes)

        let journeysRes = await getJourneys(uid)
        console.log("journeysRes: ", journeysRes)
        setJourneys(journeysRes)

        setCarousel([{question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}])
      }
      fetchData()
    }
  }, [isFocusedMainPage])

  return (
      <ScrollView 
        style={{width: '100%', alignSelf: 'center'}} 
        contentContainerStyle={{paddingBottom: 40, flexGrow: 1}}
      >
        {/* Header */}
        <Text style={{marginTop: '15%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 35, fontWeight: 'bold', color: Colors.purple}}>hey {user.name?.split(' ')[0]},</Text>
        <Text style={{marginTop: '3%', marginLeft: '7%', fontFamily: "Inconsolata-Regular",fontSize: 24, color: Colors.primaryDark}}>what's on your mind?</Text>

        {/* Carousel Section */}
        <View style={{height: 150, marginTop: '10%'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: '7%'}}>
            {carousel.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.border, {
                  height: '75%',
                  width: 200,
                  marginRight: 6,
                  padding: '1%',
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }]}>
                <Text style={[styles.primaryDarkText, {fontSize: 18}]}>
                  {item.question}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Notes Section */}
        <Text style={{marginTop: '5%', marginBottom: '3%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 28, fontWeight: 'bold', color: Colors.purple}}>
            your past thoughts</Text>
        {journeys.length === 0 ? (
          <Text style={{
            marginLeft: '7%',
            marginTop: 10,
            fontFamily: "Inconsolata-Regular",
            fontSize: 16,
            color: Colors.secondaryDark
          }}>
            No journal entries yet. Start capturing your thoughts today!
          </Text>
        ) : (
          journeys.map((journey, index) => {
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.border, {
                  width: '90%', 
                  marginLeft: '5%', 
                  height: 150,
                  backgroundColor: Colors.white, 
                  borderRadius: 5, 
                  marginTop: 15, 
                  padding: '5%',
                }]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: '2%'}}>
                {/*Generated note title + date*/}
                <Text style={[styles.primaryDarkText, {marginTop: 0}]}>
                    {journey.title}</Text>
                <Text style={{fontSize: 16, color: Colors.secondaryDark, fontFamily: 'Inconsolata-Regular', marginTop: '0%', marginRight: '2%', textAlign: 'right'}}>
                    Date</Text>
                </View>

                {/*Note preview*/}
                <Text style={[styles.secondaryDarkText, {marginTop: '5%', marginRight: '5%', textAlign: 'justify'}]} numberOfLines={3}>
                    {journey.text}</Text>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    border: {
      borderColor: Colors.lightGray,
      borderWidth: 0.5,
      borderRadius: 5,
    },
    primaryDarkText: {
      fontSize: 20,
      color: Colors.primaryDark,
      fontFamily: 'Inconsolata-Regular',
    },
    secondaryDarkText: {
      fontSize: 14,
      color: Colors.secondaryDark,
      fontFamily: 'Inconsolata-Regular',
    }
  });