//universal imports; use these in every screen...
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import * as Colors from '../components/Colors'
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { signUpFunction } from "../components/AuthFunctions";

export default function SignUp( {navigation, route} ) {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[passwordConfirm, setPasswordConfirm] = useState('')

  async function signUpButton() {
    if (password === passwordConfirm) { 
      const res = await signUpFunction(email, password)
      if (res.success) {
        navigation.navigate("PersonalInfo", {email: email, uid: res.uid})
      } else {
        Alert.alert(res.message)
      }
    } else {
      Alert.alert('Passwords do not match')
    }
  }

  return(
    <View style={styles.container}>
      
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>Let's build your community.</Text>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={{fontSize: 15}}>Email<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="example@gmail.com" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={{fontSize: 15}}>Password<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="secure password" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}} secureTextEntry></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={{fontSize: 15}}>Confirm Password<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={passwordConfirm} onChangeText={text => setPasswordConfirm(text)} placeholder="secure password" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}} secureTextEntry></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <Text style={{width: '80%', fontSize: 12, alignSelf: 'center', marginTop: '10%'}}>By signing up you agree to our <Text style={{textDecorationLine: 'underline'}}>Terms of Service</Text> and <Text style={{textDecorationLine: 'underline'}}>Privacy Policy</Text></Text>

      <Button title="Sign Up" onPress={() => signUpButton(email, password)} backgroundColor={Colors.primary} width={"80%"} height={60} marginLeft={'10%'} color={"#fff"} marginTop={'20%'}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 27,
    color: Colors.primary,
    marginTop: '25%',
    marginLeft: '10%',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 20,
    color: Colors.secondary,
    marginTop: '5%',
    marginLeft: '10%',
    fontWeight: '600'
  }
})