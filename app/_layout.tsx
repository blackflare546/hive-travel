import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  return (
    <Stack
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(modals)/login"
        options={{
          headerTitleStyle: { fontFamily: "mon-sb" },
          title: "Login",
          presentation: Platform.select({
            ios: "modal",
            android: "containedModal",
          }),
          animation: "slide_from_bottom",
          animationDuration: 100,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-circle-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(modals)/signup"
        options={{
          headerTitleStyle: { fontFamily: "mon-sb" },
          title: "Sign up",
          presentation: Platform.select({
            ios: "modal",
            android: "containedModal",
          }),
          animation: "slide_from_bottom",
          animationDuration: 100,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-circle-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />

      <Stack.Screen
        name="(modals)/booking"
        options={{
          animation: "fade",
          headerTitle: "Bookings",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-circle-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
