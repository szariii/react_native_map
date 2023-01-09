import { View, Text, StyleSheet, Switch, Image } from "react-native";
import { useEffect, useState } from "react";

const ListItem = ({
  timestamp,
  latitude,
  longitude,
  selectedPoints,
  setSelectedPoints,
  selectedAllpoints,
  setSelectedAllPoints,
}) => {
  const [selectedFlag, setSelectedFlag] = useState(false);
  useEffect(() => {
    if (selectedAllpoints === true) {
      if (selectedFlag === false) {
        changeSelectedFlag();
      }
    }
  }, [selectedAllpoints]);

  const changeSelectedFlag = async () => {
    if (selectedFlag === false) {
      setSelectedFlag(true);
      setSelectedPoints((prevState) => [
        ...prevState,
        { timestamp: timestamp, latitude: latitude, longitude: longitude },
      ]);
    } else {
      setSelectedFlag(false);
      setSelectedAllPoints(false);
      setSelectedPoints(
        selectedPoints.filter((ele) => ele.timestamp !== timestamp)
      );
    }
  };
  return (
    <View style={styles.listItem}>
      <View style={{ flex: 2 }}>
        <Image
          style={styles.image}
          source={require("../assets/img/point.png")}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 7 }}>
        <Text style={styles.header}>timestamp: {timestamp}</Text>
        <Text>latitude: {latitude}</Text>
        <Text>longitude: {longitude}</Text>
      </View>
      <Switch
        style={{ flex: 1 }}
        onValueChange={changeSelectedFlag}
        value={selectedFlag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 64,
    height: 64,
    resizeMode: "stretch",
  },

  header: {
    fontSize: 20,
    color: "#3F51B5",
  },

  listItem: {
    flexDirection: "row",
    margin: 5,
  },
});

export default ListItem;
