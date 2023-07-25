import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

  // Load the location from AsyncStorage when the app starts
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const locationData = await AsyncStorage.getItem('userLocation');
        console.log('Loaded location data:', locationData);
        if (locationData) {
          const parsedLocation = JSON.parse(locationData);
          console.log('Parsed location:', parsedLocation);
          setLocation(parsedLocation);
        }
      } catch (error) {
        console.error('Error loading location from AsyncStorage:', error);
      }
    };

    loadLocation();
  }, []);

  // Save the location to AsyncStorage whenever it changes
  useEffect(() => {
    const saveLocation = async () => {
      try {
        if (location) {
          await AsyncStorage.setItem('userLocation', JSON.stringify(location));
          console.log('Saved location:', location);
        } else {
          // Remove the location from AsyncStorage if it's null
          await AsyncStorage.removeItem('userLocation');
          console.log('Removed location.');
        }
      } catch (error) {
        console.error('Error saving location to AsyncStorage:', error);
      }
    };

    saveLocation();
  }, [location]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const values = {
    posts,
    addPost,
    location,
    setLocation,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};