import { Stack } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Colors from "@/constants/Colors";
import defaultStyles from "@/constants/Styles";
import { useEmailAuth } from "@/hooks";

const SignupPage = () => {
  const {
    router,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    pendingVerification,
    code,
    setCode,
    loading,
    onSignUpPress,
    onPressVerify,
  } = useEmailAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={[defaultStyles.inputField, styles.btn]}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[defaultStyles.inputField, styles.btn]}
          />

          <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
            <Text style={defaultStyles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(modals)/login")}>
              <Text style={{ color: Colors.primary }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={[defaultStyles.inputField, styles.btn]}
              onChangeText={setCode}
            />
          </View>
          <TouchableOpacity style={defaultStyles.btn} onPress={onPressVerify}>
            <Text style={defaultStyles.btnText}>Verify Email</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => router.replace("/(modals)/signup")}
            >
              <Text style={{ color: Colors.primary }}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  btn: {
    marginBottom: 30,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  socialAuthContainer: {
    gap: 20,
  },
  footerContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
});

export default SignupPage;
