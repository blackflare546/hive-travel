import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

const ExplorePage = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/133"}>List Details</Link>
    </View>
  );
};

export default ExplorePage;
