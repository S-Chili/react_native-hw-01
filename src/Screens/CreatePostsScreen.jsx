import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, Image } from "react-native";
import { Ionicons, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = () => {
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [image, setImage] = useState('');
    const [circleColor, setCircleColor] = useState('#fff');

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [lastImage, setLastImage] = useState('');
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
  
        setHasPermission(status === "granted");
      })();
    }, []);

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const circleContainerStyle = {
      position: 'absolute',
      width: 60,
      height: 60,
      flexShrink: 0,
      borderRadius: 30,
      backgroundColor: circleColor,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    };


    const isInputsEmpty = () => {
      return title.trim() === '' && place.trim() === '';
    };

    const onPublish = () => {
      console.log("Credentials", `title: ${title} + place: ${place}`);
      setTitle('');
      setPlace('');
      setImage('');
      setLastImage('');
      setCircleColor('rgba(255, 255, 255, 1)');
    };

    const onDelete = () => {
        setTitle('');
        setPlace('');
        setImage('');
        setCircleColor('rgba(255, 255, 255, 1)');
        setLastImage('');
      };

      const handleImageUpload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Permission to access the camera roll is required!');
          return;
        }
      
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
      
        if (!pickerResult.canceled && pickerResult.assets.length > 0) {
          // Set the selected image URI to the state variable 'image'
          setImage(pickerResult.assets[0].uri);
          setCircleColor('rgba(255, 255, 255, 0.3)'); // Change the circleContainer color when an image is uploaded
        }
      };
    
      const handleTakePicture = async () => {
        if (cameraRef) {
          const photo = await cameraRef.takePictureAsync();
      
          // Save the photo to the device's media gallery
          try {
            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            const album = await MediaLibrary.getAlbumAsync('ExpoCamera'); // Change 'ExpoCamera' to your preferred album name
            if (album == null) {
              await MediaLibrary.createAlbumAsync('ExpoCamera', asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
            }
          } catch (error) {
            console.log('Error saving photo to gallery:', error);
          }
      
          setCircleColor('rgba(255, 255, 255, 0.3)');
          setLastImage(photo.uri); // Update the lastImage state
        }
      };

  return (
    <View style={styles.container}>
        <Camera
            style={styles.imageContainer}
            type={type}
            ref={setCameraRef}
            >
            <Pressable style={circleContainerStyle} onPress={handleTakePicture}>
                <Ionicons name="camera" size={24} color="black" />
            </Pressable>
            {(image || lastImage) && (
                <Image
                source={{ uri: image || lastImage }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
            )}
        </Camera>
        <Text style={styles.greyText} onPress={handleImageUpload}>Завантажте фото</Text>
      <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              value={title}
              placeholder={'Назва...'}
              placeholderTextColor="#BDBDBD"
              onChangeText={(text) => setTitle(text)}
              autoCapitalize={'none'}
            />
            <View style={styles.inputContainer}>
                <EvilIcons name="location" size={24} color="grey" style={styles.icon} />
                <TextInput
                    style={[styles.input, styles.placeInput]}
                    value={place}
                    placeholder={'Місцевість...'}
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(text) => setPlace(text)}
                />
            </View>
            <Pressable
                style={[
                styles.button,
                { backgroundColor: isInputsEmpty() ? "#F6F6F6" : "#FF6C00" }, 
                ]}
                disabled={isInputsEmpty()} 
                onPress={onPublish}
            >
                <Text style={styles.label}>Опубліковати</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        <Pressable style={styles.ellipseContainerStyle} onPress={onDelete}>
            <MaterialCommunityIcons name="delete-outline" size={24} color="grey" />
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 343,
    height: 240,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  greyText: {
    textAlign: "left",
    color: '#BDBDBD',
    //fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "normal", 
    marginTop: 15,
    marginRight: 207,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 78,
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderRadius: 8,
    width: '100%',
    padding: 16,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
  },
  icon: {
    position: 'absolute', 
    left: 10, 
    top: 14, 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  placeInput: {
    paddingLeft: 35, 
  },
  button: {
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF6C00',
    marginTop: 32,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  ellipseContainerStyle: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    width: 70,
    height: 40,
    flexShrink: 0,
    marginBottom: 34,
  }
});

export default CreatePostsScreen;