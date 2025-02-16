import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { useState, useEffect } from 'react';

// import * as Location from 'expo-location'
import { reverseGeoCode } from '../components/FunctionCalls';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from 'moment';

import * as Colors from '../components/Colors';

export default function PersonalInfo( {navigation, route} ) {

  const { email, uid } = route.params

  const [city, setCity] = useState(",");
  const [errorMsg, setErrorMsg] = useState(null);

  const[dob, setDob] = useState(null)
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [livingLength, setLivingLength] = useState(null)

//   useEffect(() => {
//     async function getLocation() {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       //console.log(location)
//       let decoded = await reverseGeoCode(location.coords.latitude, location.coords.longitude)
      
//       setCity(decoded.city + ", " + decoded.state)
//     }

//     getLocation()
//   }, [])

  return (
    <View style={styles.container}>
      <Text style={{marginTop: '22%', marginLeft: '10%', fontSize: 25, fontWeight: '600', color: Colors.primaryDark}}>Personal Info</Text>
      <Text style={{marginTop: '2%', marginLeft: '10%', fontSize: 22, fontWeight: '400', color: Colors.secondaryDark}}>Let's get to know you</Text>
      
      <View style={{width: '80%', marginLeft: '10%', marginTop: '20%'}}>
        <TextInput value={name} onChangeText={text => setName(text)} placeholder="Name" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={phone} onChangeText={text => setPhone(text)} placeholder="Phone Number" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={city} placeholder="City" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={livingLength} placeholder={`How long have you lived in ${city.split(",")[0]}?`} placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}} onChangeText={text => setLivingLength(text)}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '8%'}}>
        <TextInput value={moment(dob).format("MM/DD/YYYY") == "Invalid date" ? "" : moment(dob).format("MM/DD/YYYY")} onTouchStart={() => setDatePickerVisibility(true)} placeholder="Date of Birth" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Button title="Next" width={'80%'} height={60} marginBottom={"30%"} onPress={() => navigation.navigate("AddPfp", {uid: uid, email: email, name: name, phone: phone, city: city, livingLength: livingLength, dob: dob})}></Button>
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
});