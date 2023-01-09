import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

const Main = ({ navigation }) => {
  const [fontLoaded, setFontloaded] = useState(false);

  const downloadFont = async () => {
    console.log("test");
    await Font.loadAsync({
      myfont: require("../assets/fonts/freedom.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    setFontloaded(true);
  };

  useEffect(() => {
    downloadFont();

    console.log("weszlo w use effecta");
  }, []);

  const titlePress = () => {
    navigation.navigate("list");
  };

  return (
    <View style={styles.main}>
      {fontLoaded === true ? (
        <View style={styles.body}>
          <TouchableOpacity onPress={titlePress}>
            <Text style={styles.fontAppName}>Geo App</Text>
          </TouchableOpacity>
          <Text style={styles.fontSubTitle}>
            find and save your position use google maps
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {console.log("weszlo w czekanie")}
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  body: {
    flex: 1,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
  },

  fontAppName: {
    color: "#C5CAE9",
    fontFamily: "myfont",
    fontSize: 80,
    textAlign: "center",
  },

  fontSubTitle: {
    color: "#C5CAE9",
    fontSize: 20,
    textAlign: "center",
    padding: 20,
  },
});

export default Main;
