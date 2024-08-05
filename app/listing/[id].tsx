import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ListingPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("ListingPage id: ", id);

  return (
    <View>
      <Text>ListingPage</Text>
    </View>
  );
};

export default ListingPage;
