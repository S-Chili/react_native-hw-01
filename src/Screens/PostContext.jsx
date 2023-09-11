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
  const [allPostsData, setAllPostsData] = useState([]);

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
      if (post.userId && post.location) {
        const postsRef = collection(db, 'posts');
        await addDoc(postsRef, { ...post, createdAt: new Date() });
        setAllPostsData([...allPostsData, { ...post, createdAt: new Date() }]);
      } else {
        console.error('userId is undefined in the post data');
      }
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