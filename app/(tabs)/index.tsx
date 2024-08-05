import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/air-bnb-listings.json";
import listingsDataGeo from "@/assets/data/air-bnb-listings.geo.json";

const ExplorePage = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const items = useMemo(() => listingsData as any, []);

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

      <Listings listings={items} category={category} />
    </View>
  );
};

export default ExplorePage;
