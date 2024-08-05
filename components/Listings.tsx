import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import defaultStyles from "@/constants/Styles";
import { ListingItemProps } from "@/interface/listing.interface";

interface Props {
  listings: any[];
  refresh?: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderItem: ListRenderItem<ListingItemProps> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Animated.Image
              source={{ uri: item.medium_url }}
              style={styles.image}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color="#f97a7a" />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <View style={{ width: 250 }}>
                <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "mon-sb" }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default Listings;
