import React, { useEffect, useState } from "react";
import { PostContext } from "./PostContext";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, RefreshControl } from "react-native";
import { EvilIcons, Fontisto } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { db } from '../../config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const getPosts = async () => {
  const postsRef = query(collection(db, 'posts'), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postsRef);
    
  const allPostsData = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const postId = doc.id;
    allPostsData.push({ ...post, id: postId });
  });
    
  return allPostsData;
};

const PostsScreen = ({ navigation }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const { location } = React.useContext(PostContext);
  const [allPostsData, setAllPostsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      

  const handleLocationPress = (post) => {
    setSelectedLocation(post.location);
    setShowMap(true);
  };

  const handleCommentsPress = (post) => {
    navigation.navigate('Comments', { image: post.image });
  };

  useEffect(() => {
    // Викликайте getPosts при завантаженні компонента
    getPosts().then(newPosts => setAllPostsData(newPosts));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const newPosts = await getPosts();
    setAllPostsData(newPosts); // Оновити дані
    setRefreshing(false);
  };
  console.log(onRefresh, 'done');
  
  return (
    <ScrollView 
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        <View style={styles.postsainer}>
      {allPostsData.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.contentPostContainer}>
          <TouchableOpacity 
            onPress={() => handleCommentsPress(post)}
            style={{ marginRight: 16 }}
          >
            <Fontisto name="comment" size={18} color="grey" style={styles.icon} />
          </TouchableOpacity>
            <View style={styles.locationContainer}>
              <EvilIcons name="location" size={24} color="grey" style={styles.icon} />
              <TouchableOpacity onPress={() => handleLocationPress(post)}  activeOpacity={0.8}>
                <Text style={styles.postTitleRight} numberOfLines={1} ellipsizeMode="tail">
                  {post.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      </View>
      <Modal visible={showMap} animationType="slide">
        <View style={{ flex: 1 }}>
          {location && (
            <MapView style={styles.map} initialRegion={initialRegion}>
              {selectedLocation && (
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  title="Selected Location"
                  description={selectedLocation.place}
                />
              )}
            </MapView>
          )}
          {!location && <Text style={styles.mapPlaceholderText}>Fetching user location...</Text>}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedLocation(null);
              setShowMap(false);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",    
  },
  postsainer: {
    marginBottom: 32,
  },
  postContainer: {
    marginTop: 32,
  },
  postImage: {
    width: 343,
    height: 240,
  },
  postTitle: {
    textAlign: "left",
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    marginTop: 8,
    marginRight: 100,
    marginBottom: 8,
  },
  postTitleRight: {
    textAlign: "right",
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    textDecorationLine: "underline",
    maxWidth: 200,
    overflow: "hidden",
  },
  contentPostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 8,
  },
  map: {
    flex: 1,
  },
  mapPlaceholderText: {
    alignSelf: "center",
    marginVertical: 16,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default PostsScreen;