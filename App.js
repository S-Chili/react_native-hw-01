import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import 'firebase/firestore';
import { firebaseConfig } from './config';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';

import RegistrationScreen from './src/Screens/RegistrationScreen';
import Home from './src/Screens/Home';
import LoginScreen from './src/Screens/LoginScreen';

import { PostProvider } from './src/Screens/PostContext';
import CommentsScreen from './src/Screens/CommentsScreen';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!isFirebaseInitialized) {
      if (!firebase.apps.length) {
        initializeApp(firebaseConfig);
      }
      setFirebaseInitialized(true);
    }
  }, []);

  if (!fontsLoaded || !isFirebaseInitialized) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <PostProvider>
      <NavigationContainer>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            <MainStack.Navigator initialRouteName="Registration">
              <MainStack.Screen 
                name="Registration" 
                component={RegistrationScreen} 
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen 
                name="Home" 
                component={Home} 
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
             />
             <MainStack.Screen 
                name="Comments" 
                component={CommentsScreen}
                options={{
                  headerShown: false,
                }}
             />
            </MainStack.Navigator>
              
            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
    </NavigationContainer>
    </PostProvider>
    </PersistGate>
    </Provider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});