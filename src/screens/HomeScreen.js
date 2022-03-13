import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import HotelDetails from "../components/HotelDetails";
import { Entypo } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";

const HomeScreen = () => {
  const [term, setTerm] = useState("");
  const [hotels, setHotels] = useState([
    { name: "This", key: "1" },
    { name: "Good for you", key: "2" },
    { name: "Good for you", key: "3" },
  ]);
  const [hotels_best, setHotelsBest] = useState([]);
  const [hotels_avg, setHotelsAvg] = useState([]);
  const [hotels_low, setHotelsLow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://priceline-com-provider.p.rapidapi.com/v2/hotels/downloadHotels?limit=20&language=en-US&country_code=BD",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
          "x-rapidapi-key": "", //Use Your own app key from priceline
        },
      }
    )
      .then((response) => response.json())
      .then((jsondata) => {
        const data = Object.values(
          jsondata["getSharedBOF2.Downloads.Hotel.Hotels"].results.hotels
        );
        console.log(data);
        data.forEach((test) => {
          if (test.review_rating >= 8) {
            setHotelsBest((previous) => {
              return [...previous, test];
            });
          } else if (test.review_rating >= 7) {
            setHotelsAvg((previous) => {
              return [...previous, test];
            });
          } else {
            setHotelsLow((previous) => {
              return [...previous, test];
            });
          }
        });

        setHotels([...data]);
      })
      .catch((err) => {
        console.log("There is an error");
        console.error(err);
      });
    setLoading(false);
  }, []);

  return (
    <ScrollView style={{}}>
      <View
        style={{
          paddingHorizontal: 20,
          position: "relative",
          marginTop: 20,
        }}
      >
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "lightgray",
            borderRadius: 20,
            position: "relative",
            height: 40,
            paddingHorizontal: 20,
            paddingLeft: 45,
            color: "rgb(0,0,0)",
          }}
          placeholder="Search"
          onChangeText={(newtext) => {
            setTerm(newtext);
          }}
          onEndEditing={() => {}}
        />
        <Image
          style={{
            width: 30,
            height: 30,
            position: "relative",
            top: -33,
            left: 15,
            backgroundColor: "lightgray",
          }}
          source={require("./../../assets/search.png")}
        />
      </View>
      <Text style={styles.category}>
        Best Rated Hotels <Entypo name="star" size={28} color="green" />
      </Text>
      <SkeletonContent
        containerStyle={{ paddingLeft: 10 }}
        isLoading={false}
        layout={[
          { key: "hotelImahe", width: 225, height: 100, marginBottom: 6 },
          { key: "hotelName", width: 180, height: 20, marginBottom: 6 },
          { key: "hotelCity", width: 100, height: 20, marginBottom: 6 },
          { key: "rating", width: 130, height: 20, marginBottom: 6 },
        ]}
      >
        <FlatList
          style={{ marginBottom: 20 }}
          data={hotels_best}
          renderItem={({ item }) => {
            return <HotelDetails data={item} />;
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SkeletonContent>

      <Text style={styles.category}>
        Average Rated Hotels <Entypo name="star" size={28} color="blue" />
      </Text>
      <SkeletonContent
        containerStyle={{ paddingLeft: 10 }}
        isLoading={false}
        layout={[
          { key: "hotelImahe", width: 225, height: 100, marginBottom: 6 },
          { key: "hotelName", width: 180, height: 20, marginBottom: 6 },
          { key: "hotelCity", width: 100, height: 20, marginBottom: 6 },
          { key: "rating", width: 130, height: 20, marginBottom: 6 },
        ]}
      >
        <FlatList
          style={{ marginBottom: 20 }}
          data={hotels_avg}
          renderItem={({ item }) => {
            return <HotelDetails data={item} />;
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SkeletonContent>

      <Text style={styles.category}>
        Worst Rated Hotels <Entypo name="star" size={28} color="red" />
      </Text>
      <SkeletonContent
        containerStyle={{ paddingLeft: 10 }}
        isLoading={false}
        layout={[
          { key: "hotelImahe", width: 225, height: 100, marginBottom: 6 },
          { key: "hotelName", width: 180, height: 20, marginBottom: 6 },
          { key: "hotelCity", width: 100, height: 20, marginBottom: 6 },
          { key: "rating", width: 130, height: 20, marginBottom: 6 },
        ]}
      >
        <FlatList
          style={{ marginBottom: 20 }}
          data={hotels_low}
          renderItem={({ item }) => {
            return <HotelDetails data={item} />;
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SkeletonContent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
