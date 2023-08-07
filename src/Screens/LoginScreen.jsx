import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Pressable,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      alert('Імейл має бути правильного формату');
      return;
    }
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Logged in with:', user.email);
          navigation.navigate('Home', {
            screen: 'PostsScreen',
          });
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          alert('На жаль, ця електронна адреса не була зареєстрована, використайте іншу, або зареєструйте акаунт.');
          setEmail('');
          setPassword('');
        } else if (errorCode === 'auth/wrong-password') {
          alert('На жаль, пароль не вірний, використайте інший.');
          setPassword(''); 
        }
      });
    } catch (error) {
      console.log('Error during sign in:', error);
      // Handle other errors
    }
  };



  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/photoBG.png')}
        style={styles.imageBgr}
      >
        <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.containerLogin}>   
          <Text style={styles.title}>Увійти</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder={'Адреса електронної пошти'}
            placeholderTextColor="#BDBDBD"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder={'Пароль'}
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <Pressable 
            style={styles.button}
            onPress={onLogin}
          >
            <Text style={styles.label}>Увійти</Text>
          </Pressable>
          <Pressable 
            style={styles.link}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.linklabel}>Немає акаунту? Зареєструватися</Text>
          </Pressable>   
    
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
    </View>
    
  );
};

export default LoginScreen;

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
  containerLogin: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 78,
  },
  title: {
    color: '#212121',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    marginBottom: 32,
    marginTop: 32,
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
