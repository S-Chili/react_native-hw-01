import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../config';
import { testDatabaseConnection } from './firebaseTest'

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Викликаємо функцію реєстрації з Firebase
      navigation.navigate('Home', {
        screen: 'PostsScreen',
      });
    } catch (error) {
      console.log('Error during registration:', error);
      // Тут можна додати обробку помилки реєстрації, наприклад, показати повідомлення користувачу
    }
  };

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/photoBG.png')}
        style={styles.imageBgr}
      >
        <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.content}>
            <View style={styles.imageWrapper}>
              <View style={styles.image} >
                <AntDesign
                  style={styles.plusIcon}
                  name="pluscircleo"
                  size={24}
                  color="black"
                />
              </View>
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
            <Pressable style={styles.button} onPress={onRegister}>
              <Text style={styles.label}>Зареєстуватися</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linklabel}>Вже є акаунт? Увійти</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBgr: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 78,
    paddingBottom: 78,
  },
  imageWrapper: {
    position: 'absolute',
    top: -60,
    alignItems: 'center',
    paddingBottom: 32,
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
    fontFamily: 'Roboto-Medium',
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
    height: 120,
    width: 120,
    marginBottom: 32,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
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