import { View, Text, SafeAreaView, Button, Platform } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const ProfilePage = () => {
  const { signOut, isSignedIn } = useAuth();

  console.log("isSignedIn: ", isSignedIn);
  return (
    <SafeAreaView
      style={{
        flex: Platform.OS === "android" ? 0 : 1,
        backgroundColor: "#ffff",
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <View>
        {!isSignedIn ? (
          <Link href={"/(modals)/login"}>
            <Text>Login</Text>
          </Link>
        ) : (
          <Button title="Sign Out" onPress={() => signOut()} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
