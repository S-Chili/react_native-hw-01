import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../config';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  const { userId} = useSelector(state => state.user);

  useEffect(() => {
    const loadData = async () => {
      try {
        const locationData = await AsyncStorage.getItem('userLocation');
        if (locationData) {
          const parsedLocation = JSON.parse(locationData);
          setLocation(parsedLocation);
        }
        
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        if (location) {
          await AsyncStorage.setItem('userLocation', JSON.stringify(location));
        } else {
          await AsyncStorage.removeItem('userLocation');
        }
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [location]);

  const addPost = async (post) => {
    try {
      const postsRef = collection(db, 'posts');
      await addDoc(postsRef, { ...post, userId, createdAt: new Date() }); // Додали userId до поста
      console.log(userId);
      setPosts([{ ...posts, post, userId, createdAt: new Date() } ]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const values = {
    posts,
    addPost,
    location,
    setLocation,
    userId,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};