import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { PostContext } from './PostContext'; 
import { EvilIcons, Fontisto, AntDesign, Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";


const ProfileScreen = ({ navigation }) => {

    const [showMap, setShowMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const { posts, location } = React.useContext(PostContext);
  
    const reversedPosts = [...posts].reverse();
  
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

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/photoBG.png')}
        style={styles.imageBgr}
      >
          <View style={styles.content}>
            <View style={styles.imageWrapper}>
              <View style={styles.image} >
                <AntDesign 
                    style={styles.plusIcon} 
                    name="closecircleo" 
                    size={24} 
                    color="#BDBDBD" 
                />
                
              </View>
              <TouchableOpacity 
                    onPress={() => navigation.navigate('Registration')}
                    style={{ marginRight: 16 }}
                >
                    <Feather
                        style={styles.logIcon}
                        name="log-out"
                        size={24}
                        color="#BDBDBD"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.postsContainer}>
            {posts.length === 0 ? (
              <Text style={styles.noPostsText}>You haven't posted any images yet.</Text>
            ) : (
                reversedPosts.map((post, index) => (
                <View key={index} style={styles.postContainer}>
                  <Image
                    source={{ uri: post.image }}
                    style={styles.postImage}
                    onError={() => console.log('Image failed to load')}
                  />
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <View style={styles.contentPostContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                    onPress={() => handleCommentsPress(post)}
                    style={{ marginRight: 16 }}
                    >
                    <Fontisto name="comment" size={18} color="grey" />
                    </TouchableOpacity>
                    <EvilIcons name="like" size={30} color="#FF6C00" />
                </View>
                    <View style={styles.locationContainer}>
                        <EvilIcons name="location" size={24} color="grey"/>
                        <TouchableOpacity onPress={() => handleLocationPress(post)} activeOpacity={0.8}>
                            <Text style={styles.postTitleRight} numberOfLines={1} ellipsizeMode="tail">
                            {post.place}
                            </Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
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
            </View>
           
          </View>
      </ImageBackground>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    
  },
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
    paddingTop: 173,
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
    paddingTop: 78,
   
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
  },
  logIcon: {
    position: 'absolute',
    right: -190.5,
    bottom: 118,
    width: 25,
    height: 25,
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 103,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  noPostsText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 100,
  },
  postsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 43,
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
    color: '#212121',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "normal", 
    marginTop: 8,
    marginRight: 100,
    marginBottom: 8,
  },
  postTitleRight: {
    textAlign: "right",
    color: '#212121',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "normal", 
    textDecorationLine: 'underline',
    maxWidth: 200, 
    overflow: 'hidden',
  },
  contentPostContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
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