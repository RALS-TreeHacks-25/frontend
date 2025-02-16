import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
// import { getUser, getCarousel, getNotes } from '../components/FunctionCalls';
import { useIsFocused } from '@react-navigation/native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../components/Colors'

export default function MainPage( {navigation, route} ) {
  const { uid } = route.params

  const [user, setUser] = useState({name: null, email: null, uid: null}) // TODO add params here
  const [carousel, setCarousel] = useState([])
  const [notes, setNotes] = useState([])

  const isFocusedMainPage = useIsFocused()

  // TODO: add carousel and fix this function overall
  useEffect(() => {
    if(isFocusedMainPage) {
      async function fetchData() {
        console.log("fetching data...")
  
        let userRes = await getUser(uid)
        setUser(userRes)

        let carouselRes = await getCarousel()
        setCarousel(carouselRes)

        let notesRes = await getNotes()
        setNotes(notesRes)
      }
      fetchData()
    }
  }, [isFocusedMainPage])

  return (
    <View style={styles.container}> 
      <ScrollView style={{width: '100%', alignSelf: 'center'}}>

      {/* Header */}
      <Text style={{marginTop: '5%', marginLeft: '10%', fontFamily: "Inconsolata-Regular", fontSize: 35, fontWeight: 'bold', color: Colors.purple}}>hey {user.name},</Text>
      <Text style={{marginTop: '5%', marginLeft: '10%', fontFamily: "Inconsolata-Regular",fontSize: 24, color: Colors.purple}}>what's on your mind?</Text>

      {/* Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: '10%'}}
        contentContainerStyle={{paddingHorizontal: 20}}>
        {carouselItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginRight: 15, // TODO
              padding: 15, // TODO
              backgroundColor: Colors.white,
              borderRadius: 5,
              shadowColor: '#000',
              // TODO shadow
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text style={{marginTop: 10, fontSize: 16, fontWeight: '600'}}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Bar would go here if we implement it*/}

      {/*<View style={{width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: '5%', justifyContent: 'space-between', alignSelf: 'center'}}>
        <View style={{width: '83%', height: 30, backgroundColor: '#fff', borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: '5%', shadowColor: '#000', shadowOpacity: 0.35, shadowOffset: {width: 1, height: 3}}}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color={Colors.secondaryDark} size={15}></FontAwesomeIcon>
        </View>

        <FontAwesomeIcon icon={faSliders} size={20} color={Colors.secondaryDark}></FontAwesomeIcon>
      </View>*/}

        {/* Main notes list */}
        <Text style={{marginTop: '5%', marginLeft: '10%', fontFamily: "Inconsolata-Regular", fontSize: 28, fontWeight: 'bold', color: Colors.purple}}>your past thoughts</Text>
        {
          notes.map((note, index) => {
            return (
                // TODO add opening the completed annotated note page
              <TouchableOpacity key={index} style={{width: '90%', marginLeft: '5%', height: 375, backgroundColor: Colors.white, borderRadius: 0.5, marginBottom: 6, marginTop: '5%', paddingHorizontal: '5%', shadowColor: '#000', shadowOpacity: 0.35, shadowOffset: {width: 1, height: 3}}} onPress={() => navigation.navigate("Note", {user: user, campaign: campaign})} activeOpacity={0.9}>
                {/*Generated note title + date*/}
                <Text style={{fontSize: 20, color: Colors.primaryDark, marginTop: '5%'}}>
                    Generated Note Title</Text>

                {/*Note preview : TODO*/}

              </TouchableOpacity>
            )
          })
        }

        <View style={{marginTop: '20%'}}></View>
      </ScrollView>
    </View>
  );
}

const carouselItems = [
    {
      title: 'Item 1',
      text: 'text',
    },
    {
      title: 'Item 2',
      text: 'text',
    },
    {
      title: 'Item 3',
      text: 'text',
    },
    // Add more items as needed
  ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});