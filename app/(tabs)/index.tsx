import { Stack } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const ExplorePage = () => {
  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    console.log("CHANGE CATEGORY: ", category);
    setCategory(category);
  };

  // TODO: ADD API QUERY

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <Listings listings={[]} category={category} />
    </View>
  );
};

export default ExplorePage;
