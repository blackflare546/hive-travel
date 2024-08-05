import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import defaultStyles from "@/constants/Styles";
import { Strategy } from "@/enums/stragery.enum";
import { useEmailLogin, useSocialAuth, useWarmUpBrowser } from "@/hooks";
import { useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";

const LoginPage = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { onSelectAuth } = useSocialAuth();

  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    loading,
    onSignInPress,
  } = useEmailLogin();

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
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

      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.horizontalView}>
        <View style={styles.horizontalLine} />
        <Text style={styles.separator}>or</Text>
        <View style={styles.horizontalLine} />
      </View>

      <View style={styles.socialAuthContainer}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="phone-portrait-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text>No Account?</Text>
        <TouchableOpacity onPress={() => router.replace("/(modals)/signup")}>
          <Text style={{ color: Colors.primary }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  horizontalView: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  horizontalLine: {
    flex: 1,
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    fontSize: 16,
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
    gap: 10,
    marginVertical: 20,
    justifyContent: "center",
  },
});

export default LoginPage;
