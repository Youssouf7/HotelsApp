import React from "react";
import { Image, View, Text } from "react-native";

const HotelDetails = ({ data }) => {
  const img_url = "https:" + data.thumbnail;
  return (
    <View style={{ padding: 10 }}>
      <Image
        style={{ width: 250, height: 170 }}
        source={{
          uri: img_url,
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {data.hotel_name}
      </Text>
      <Text>{data.city}</Text>
      <Text style={{ fontSize: 15 }}>
        <Text style={{ fontSize: 15 }}>{data.review_rating / 2}</Text> stars,{" "}
        {data.review_count} Reviews
      </Text>
    </View>
  );
};

export default HotelDetails;
