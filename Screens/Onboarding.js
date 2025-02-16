import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PurpleButton, WhiteButton } from '../components/Button';
import { useState, useEffect } from 'react';

// import * as Location from 'expo-location'
import { reverseGeoCode } from '../components/FunctionCalls';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createUser } from "../components/FunctionCalls";
import moment from 'moment';

import * as Colors from '../components/Colors';

export default function Onboarding( {navigation, route} ) {

  const { email, uid } = route.params;

  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const[dob, setDob] = useState(null)
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)

  const [bio, setBio] = useState(null)

  async function proceed() {
    console.log("trying!")

    let user = {
      uid: uid,
      name: name,
      phone: phone,
      email: email,
      dob: dob,
      city: city,
      bio: bio,
    }

    let res = await createUser(user)
    console.log(res)

    if(res.status == 200) {
      navigation.navigate("BottomTab", {uid: uid})
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }

  return (
    <View style={styles.container}>
      {/*for scrollview container: style={{width: '100%', alignSelf: 'left', backgroundColor: Colors.background}} 
      contentContainerStyle={{paddingBottom: 40, flexGrow: 1}}>*/}

      <Text style={[styles.header, {marginTop: '15%'}]}>let's get to know you</Text>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={name} placeholder="name" onChangeText={text => setName(text)} placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={phone} onChangeText={text => setPhone(text)} placeholder="phone number" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}} keyboardType="phone-pad"></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={city} placeholder="city" onChangeText={text => setCity(text)} placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={moment(dob).format("MM/DD/YYYY") == "Invalid date" ? "" : moment(dob).format("MM/DD/YYYY")} onTouchStart={() => setDatePickerVisibility(true)} placeholder="date of birth" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <Text style={[styles.subHeader, {marginTop: '15%'}]}>what's your story?</Text>
      <Text style={[styles.subHeader, {marginTop: '2%', fontSize: 16, color: Colors.secondaryDark}]}>tell me briefly about yourself</Text>
      <View style={styles.container}>
        <TextInput
        placeholder="I am..."
        placeholderTextColor={Colors.secondaryDark}
        placeholderStyle={{fontFamily: 'Inconsolata-Regular'}}
        multiline={true}
        textAlignVertical="top"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={(text) => setBio(text)}
        scrollEnabled={false}
        maxLength={1000}
        style={[styles.basicText, {
          borderWidth: 0.5,
          borderRadius: 5,
          borderColor: Colors.lightGray,
          marginLeft: '10%',
          marginTop: '3%',
          width: '80%',
          height: '90%',
          textAlignVertical: 'top',
        }]}
      />
      </View>

      <PurpleButton title="save" width={'80%'} height={60} marginLeft={'10%'} marginBottom={"7%"} marginTop={"5%"} onPress={() => proceed()}></PurpleButton>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setDob(date.toISOString())
          setDatePickerVisibility(false)
        }}
        onCancel={() => setDatePickerVisibility(false)}
      >
      </DateTimePickerModal>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.purple,
    marginLeft: '10%',
    fontFamily: 'Inconsolata-Regular',
  },
  subHeader: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 600,
    marginLeft: '10%',
    color: Colors.primaryDark,
    fontFamily: 'Inconsolata-Regular',
  },
  basicText: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.primaryDark,
    fontFamily: 'Inconsolata-Regular',
  }
});