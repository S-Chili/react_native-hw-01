import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config";

const CommentsScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const { username } = useSelector(state => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Отримання коментарів для цього посту з бази даних
    const getComments = async () => {
      // Отримати посилання на колекцію коментарів для даного посту
      const commentsRef = query(collection(db, "comments"), orderBy("time", "desc"));
      // Використовуємо "where" для фільтрації коментарів за зображенням
      const querySnapshot = await getDocs(
        query(commentsRef, where("image", "==", image))
      );

      const commentsData = [];
      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        commentsData.push(comment);
      });
  
      setComments(commentsData.reverse());
    };

    getComments();
  }, [image]);

  const addCommentToDB = async () => {
    if (comment.trim() !== "") {
      try {
        // Додати новий коментар до бази даних
        await addDoc(collection(db, "comments"), {
          text: comment,
          time: serverTimestamp(), // Використовуємо serverTimestamp тут
          image: image,
          name: username,
        });
    
        // Додати новий коментар безпосередньо до поточного списку коментарів
        const newComment = { text: comment, time: new Date(), name: username }; // Замінено на new Date()
        setComments([...comments, newComment]);
        
        setComment(""); // Очищення поля вводу
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const formatTime = (timestamp) => {
    if (timestamp instanceof Date) {
     
      return format(timestamp, "d MMMM, yyyy | HH:mm");
    } else if (timestamp && timestamp.seconds) {
    
      const date = new Date(timestamp.seconds * 1000); // Перетворюємо секунди на мілісекунди
      return format(date, "d MMMM, yyyy | HH:mm");
    }
    return "";
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
            <Text style={styles.commentName}>{item.name}</Text>
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
          <TouchableOpacity onPress={addCommentToDB} style={styles.inputBtn}>
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
    paddingRight: 40,
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
    minHeight: 52,
    padding: 16,
    paddingBottom: 0,
    flex: 1,
  },
  commentTime: {
    color: "grey",
    fontSize: 10,
    alignSelf: "flex-end",
  },
  commentName: {
    color: "grey",
    fontSize: 10,
    alignSelf: "flex-start",
  },
});

export default CommentsScreen;