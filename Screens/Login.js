import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import * as Colors from '../components/Colors'
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { login } from '../components/AuthFunctions';

export default function Login({navigation, route}) {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  async function loginButton() {
    let res = await login(email, password)
    if (res.success) {
      navigation.navigate("Navbar", {uid: res.uid})
    } else {
      Alert.alert(res.message)
    }
  }

  return(
    <View style={styles.container}>
      <ImageBackground source={require('../assets/signup.png')} style={{height:"100%",width:"100%", justifyContent:"center"}} >
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subHeader}>Welcome back.</Text>


      <View style={{width: '80%', marginLeft: '10%', marginTop: '35%'}}>
        <Text style={{fontSize: 15}}>Email<Text style={{fontWeight: "bold", color: Colors.primary}}> *</Text></Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="example@gmail.com" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={{fontSize: 15}}>Password<Text style={{fontWeight: "bold", color: Colors.primary}}> *</Text></Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="secure password" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}} secureTextEntry></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>
      
      <Button title="Login" onPress={() => loginButton(email, password)} backgroundColor={Colors.primary} width={"80%"} height={60} marginLeft={'10%'} color={"#fff"} marginTop={'40%'}></Button>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 27,
    color: Colors.primary,
    marginTop: '0%',
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
});