import { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View, TextInput } from 'react-native';
import {verifPwd} from './verifPwd.js';

export default function App() {
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');

  const showClick = async () => {
  if (!mail || !pwd) {
    ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
    return;
  }
  if(!verifPwd(pwd)){
    ToastAndroid.show("Please your password needs to have at least one letter, one uppercase, one symbol and one digit", ToastAndroid.SHORT);
    return;

  }

  try {
    const response = await fetch('https://bustest.onrender.com/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail,
        pwd,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      ToastAndroid.show("Login saved!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Error: " + (data.error || "Unknown"), ToastAndroid.LONG);
    }
    if (response.ok && data.success) {
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
    <View style={styles.container}>
      {/* Middle input */}
      <View style={styles.centerContent}>
        <TextInput
          style={styles.input}
          placeholder="Type your e-mail..."
          value={mail}
          onChangeText={setMail}
        />
      
        <TextInput
          style={[styles.input, { marginTop: 20 }]}
          placeholder="Type your password..."
          value={pwd}
          secureTextEntry={true}
          onChangeText={setPwd}
        />
      </View>

      {/* Bottom button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.button} onPress={showClick}>
          <Text style={{ color: "#fff" }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33ffec',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    paddingBottom: 200,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#073123",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
