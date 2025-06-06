import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';

import { verifPwd } from '../verifPwd';
import { verifMail } from '../verifMail';

export default function LoginScreen() {
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async () => {
    if (!mail || !pwd) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    if (!verifMail(mail)) {
      ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
      return;
    }

    /*if (pwd!=) {
      ToastAndroid.show("Weak password , it needs at least 8 characters , an uppercase , a digit , and a symbol", ToastAndroid.SHORT);
      return;
    }*/

    try {
      const response = await fetch('https://bustest.onrender.com/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, pwd }),
      });

      const data = await response.json();

      if (data.success) {
        ToastAndroid.show("Login saved!", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Error: " + (data.error || "Unknown"), ToastAndroid.LONG);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Network error", ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.centerContent}>
      <TextInput style={styles.input} placeholder="Email" value={mail} onChangeText={setMail} />
      <TextInput style={styles.input} placeholder="Password" value={pwd} onChangeText={setPwd} secureTextEntry />
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={{ color: "#000000",fontSize: 16,fontWeight: 'bold' }}>Log In</Text>
</TouchableOpacity>

    </View>
  );
}

  

const styles = StyleSheet.create({
  input: {
    width: 280,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A5F'
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#33ffec",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

});
