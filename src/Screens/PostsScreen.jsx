import React from "react";
import { PostContext } from './PostContext'; // Шлях до вашого PostContext
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from "react-native";

const PostsScreen = () => {
  // Отримайте дані з контексту
  const { posts } = React.useContext(PostContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text>{post.title}</Text>
            <Text>{post.place}</Text>
            <Image source={{ uri: post.image }} style={styles.postImage} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1, // Забезпечить прокрутку, якщо контент не поміщається на екрані
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    marginBottom: 16,
  },
  postImage: {
    width: 343,
    height: 240,
  },
});

export default PostsScreen;