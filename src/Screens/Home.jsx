import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Fontisto, Feather } from '@expo/vector-icons'; 
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "ProfileScreen") {
            iconName = "user";
          } else if (route.name === "PostsScreen") {
            iconName = "appstore-o";
          } else if (route.name === "CreatePosts") {
            iconName = "pluscircle";
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: true,
        headerTitleAlign: 'center',
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="grey"
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Створити публікацію",
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <Fontisto
              name="arrow-left-l"
              size={24}
              color="grey"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate('PostsScreen')}
            />
          ),
          tabBarStyle: { display: 'none' }, // Hide the bottom tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;