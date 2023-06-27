import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onPress = () => {
    console.log('Button pressed!');
  };

  const onLoginPress = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <AntDesign
          style={styles.plusIcon}
          name="pluscircleo"
          size={24}
          color="black"
        />
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={'Логін'}
        placeholderTextColor="#BDBDBD"
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholder={'Адреса електронної пошти'}
        placeholderTextColor="#BDBDBD"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={'Пароль'}
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.label}>Зареєстуватися</Text>
      </Pressable>
      <Pressable style={styles.link} onPress={onLoginPress}>
        <Text style={styles.linklabel}>Вже є акаунт? Увійти</Text>
      </Pressable>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      width: `100%`,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 25,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 78,
    },
    plusIcon: {
      position: 'absolute',
      right: -12.5,
      bottom: 16,
      width: 25,
      height: 25,
      color: '#FF6C00',
    },
    title: {
      color: '#212121',
      fontSize: 30,
      fontFamily: 'Roboto-Regular',
      marginBottom: 32,
    },
    input: {
      height: 50,
      marginBottom: 16,
      backgroundColor: '#F6F6F6',
      borderRadius: 8,
      width: '100%',
      padding: 16,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#E8E8E8',
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 32,
      backgroundColor: '#F6F6F6',
      borderRadius: 16,
      marginTop: -60,
    },
    button: {
      width: '100%',
      borderRadius: 100,
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FF6C00',
      marginTop: 43,
    },
    label: {
      color: '#fff',
      fontSize: 16,
    },
    link: {
      width: '100%',
      alignItems: 'center',
    },
    linklabel: {
      color: '#1B4371',
      fontSize: 16,
      marginTop: 16,
    },
  });