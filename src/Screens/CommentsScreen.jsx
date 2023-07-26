import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

const CommentsScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      const currentTime = new Date();
      setComments([...comments, { text: comment, time: currentTime }]);
      setComment("");
    }
  };

  const formatTime = (time) => {
    return format(new Date(time), "d MMMM, yyyy | HH:mm");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeftContainer}
        >
          <Fontisto name="arrow-left-l" size={24} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Коментарі</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.postImage} />
        </View>
        <View style={styles.commentContainer}>
        {comments.map((item, index) => (
          <View key={index} style={styles.commentEachContainer}>
            <Text style={styles.commentText}>{item.text}</Text>
            <Text style={styles.commentTime}>{formatTime(item.time)}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <TextInput
            style={styles.input}
            value={comment}
            placeholder={"Коментувати..."}
            placeholderTextColor="#BDBDBD"
            onChangeText={(text) => setComment(text)}
            autoCapitalize={"none"}
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.inputBtn}>
            <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
  },
  headerContainer: {
    backgroundColor: "#FFF",
    paddingTop: 60,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: "#E3E3E3",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
    fontSize: 16,
    marginRight: 40,
  },
  headerLeftContainer: {
    alignItems: "center",
    marginLeft: 16,
  },
  postImage: {
    width: 343,
    height: 240,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: -20,
    padding: 16,
    flexDirection: "row",
  },
  
  input: {
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 343,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
  inputBtn: {
    position: "absolute",
    right: 10,
    top: 7,
    width: 34,
    height: 34,
  },
  commentContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 128,
  },
  commentEachContainer: {
    borderRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 10,
    marginTop: 16,
    width: 299,
    minHeight: 103,
    flexShrink: 0,
  },
  commentText: {
    color: "black",
    fontSize: 13,
    width: 267,
    height: 52,
    padding: 16,
    flex: 1,
  },
  commentTime: {
    color: "grey",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 8,
  },
});

export default CommentsScreen;