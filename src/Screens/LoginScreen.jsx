import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Pressable,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    console.log("Credentials", `email: ${email} + password: ${password}`);
  };

  const onLoginPress = () => {
    console.log('Registration');
  };

  return (
    <>
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
            onPress={onLoginPress}
          >
            <Text style={styles.linklabel}>Немає акаунту? Зареєструватися</Text>
          </Pressable>   
    
    </View></>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerLogin: {
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