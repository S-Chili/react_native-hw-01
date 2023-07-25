import React from "react";
import { PostContext } from './PostContext'; 
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { EvilIcons, Fontisto } from "@expo/vector-icons";

const PostsScreen = () => {
 
  const { posts } = React.useContext(PostContext);

  const reversedPosts = [...posts].reverse();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {reversedPosts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.contentPostContainer}>
            <Fontisto name="comment" size={18} color="grey" style={styles.icon} />
            <View style={styles.locationContainer}>
              <EvilIcons name="location" size={24} color="grey" style={styles.icon} />
              <Text style={styles.postTitleRight} numberOfLines={1} ellipsizeMode="tail">{post.place}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
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

export default PostsScreen;