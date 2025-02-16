import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { PurpleButton } from '../components/Button';
import { useState, useEffect } from 'react';

// import * as Location from 'expo-location'
import { reverseGeoCode } from '../components/FunctionCalls';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createUser } from "../components/FunctionCalls";
import moment from 'moment';

import * as Colors from '../components/Colors';

export default function Onboarding( {navigation, route} ) {

  const { email, uid } = route.params

  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const[dob, setDob] = useState(null)
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [livingLength, setLivingLength] = useState(null)

  async function proceed() {
    console.log("trying!")

    let user = {
      uid: uid,
      name: name,
      phone: phone,
      email: email,
      dob: dob,
      city: city,
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
      <Text style={styles.header}>personal info</Text>
      
      <View style={{width: '80%', marginLeft: '10%', marginTop: '20%'}}>
        <TextInput value={name} onChangeText={text => setName(text)} placeholder="Name" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={phone} onChangeText={text => setPhone(text)} placeholder="Phone Number" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}} keyboardType="phone-pad"></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={city} placeholder="City" onChangeText={text => setCity(text)} placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={moment(dob).format("MM/DD/YYYY") == "Invalid date" ? "" : moment(dob).format("MM/DD/YYYY")} onTouchStart={() => setDatePickerVisibility(true)} placeholder="Date of Birth" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <PurpleButton title="next" width={'80%'} height={60} marginBottom={"30%"} onPress={() => proceed()}></PurpleButton>
      </View>

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
    fontSize: 40,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.purple,
    marginLeft: '10%',
    fontFamily: 'Inconsolata-Regular',
  },
  subHeader: {
    fontSize: 25,
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