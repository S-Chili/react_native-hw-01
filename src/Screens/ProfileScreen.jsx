import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { PostContext } from './PostContext'; 
import { EvilIcons, Fontisto } from "@expo/vector-icons";

const ProfileScreen = () => {

  const { posts } = React.useContext(PostContext);

  const reversedPosts = [...posts].reverse();

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
                  name="pluscircleo"
                  size={24}
                  color="black"
                />
              </View>
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
                    <Fontisto name="comment" size={18} color="grey" style={styles.icon} />
                    <View style={styles.locationContainer}>
                      <EvilIcons name="location" size={24} color="grey" style={styles.icon} />
                      <Text style={styles.postTitleRight} numberOfLines={1} ellipsizeMode="tail">{post.place}</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
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
    paddingTop: 103,
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
    color: '#FF6C00',
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
    flexDirection: 'row',
    alignItems: 'center', 
    position: 'absolute',
    bottom: 0, 
    right: 0, 
    marginRight: 8, 
  },
});