import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const Map = ({ route, navigation }) => {
  const { selectedPoints } = route.params;
  console.log(selectedPoints);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        // latitude: 50.111,
        // longitude: 20.111,
        latitude: selectedPoints[0].latitude,
        longitude: selectedPoints[0].longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      {selectedPoints.map((ele, index) => (
        <Marker
          coordinate={{
            latitude: ele.latitude,
            longitude: ele.longitude,
          }}
          key={index}
          title={"pos"}
          description={"opis"}
        />
      ))}
    </MapView>
  );
};

export default Map;
