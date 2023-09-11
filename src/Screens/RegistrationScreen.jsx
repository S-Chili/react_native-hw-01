import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ImageBackground, KeyboardAvoidingView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { setUser } from '../redux/actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [userId, setUserId] = useState(''); // Оновлено з const на useState

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailRegex)) {
        alert('Імейл має бути правильного формату');
        return;
      }
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Registered with:', user.email);

          const displayName = username;
          const userId = user.uid; // Оновлено userId внутрішньо в області видимості onRegister
          setUserId(userId); // Оновлено змінну userId за допомогою setUserId

          AsyncStorage.setItem('userId', userId);

          updateProfile(user, { displayName, photoURL: selectedImage })
            .then(() => {
              dispatch(setUser({ username: user.displayName, email: user.email, userId: user.uid, selectedImage: user.photoURL}));
              console.log('Profile uid', userId);
              console.log('Profile updated successfully');
              console.log('Profile updated with:', user.displayName);
              console.log('Profile updated with photo:', user.photoURL);
            })
            .catch((error) => {
              console.error('Error updating profile:', error);
            });

          navigation.navigate('Home', {
            screen: 'PostsScreen', 
          });
          setEmail(''); 
          setPassword('');
          setUsername('');
          setSelectedImage('');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/email-already-in-use') {
            alert('На жаль, ця електронна адреса вже була зареєстрована, використайте іншу, або увійдіть в акаунт.');
            setEmail(''); 
            setPassword('');
            setSelectedImage(''); 
          }
        });
    } catch (error) {
      console.log('Error during registration:', error);
    }
  };

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/photoBG.png')}
        style={styles.imageBgr}
      >
        <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.content}>
            <View style={styles.imageWrapper}>
            <Pressable onPress={selectImage}>
              <View style={styles.image}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                  <AntDesign
                    style={styles.plusIcon}
                    name="pluscircleo"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            </Pressable>
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