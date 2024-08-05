import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const ProfilePage = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <SafeAreaView>
      <View>
        {!isSignedIn ? (
          <Link href={"/(modals)/login"}>
            <Text>Login</Text>
          </Link>
        ) : (
          <Button title="Sign In" onPress={() => signOut()} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
