import {
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

import MyButton from "./MyButton";
import ListItem from "./ListItem";

const List = ({ navigation }) => {
  const [dataState, setDataState] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedAllpoints, setSelectedAllPoints] = useState(false);
  const [takingPosition, setTakingPosition] = useState(false);
  useEffect(() => {
    const heandleData = async () => {
      setDataState(await getAllData());
    };
    heandleData();
  }, []);

  const setData = async (value) => {
    //const keys = ["1668462786813","1668462883425","1668463015810"]
    //await AsyncStorage.clear();
    await AsyncStorage.setItem(`${Date.now()}`, JSON.stringify(value));
    setDataState(await getAllData());
    setTakingPosition(false);
  };

  const deleteAllData = async () => {
    await AsyncStorage.clear();
    setSelectedPoints([]);
    setDataState([]);
  };

  const getAllData = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let stores = await AsyncStorage.multiGet(keys);

    const array = [];
    let maps = stores.map((result, i, store) => {
      let key = store[i][0];
      let value = store[i][1];
      array.push({ key: key, value: value });
    });
    return array;
  };

  const moveToMapHandler = () => {
    if (selectedPoints.length !== 0) {
      navigation.navigate("map", { selectedPoints: selectedPoints });
    } else {
      alert("zaznacz przynjamniej jedną pozycję");
    }
  };
  const getPosition = () => {
    Alert.alert("pozycja", "pozycja została pobrana - czy zapisać?", [
      {
        text: "Tak",
        onPress: async () => {
          setTakingPosition(true);
          let pos = await Location.getCurrentPositionAsync({});
          setData(pos);
        },
        style: "cancel",
      },
      { text: "Nie", onPress: () => {} },
    ]);
  };

  const alertWithGetPosition = async () => {
    await Location.requestForegroundPermissionsAsync();
    getPosition();
  };

  const changeSelectOfAllPositions = () => {
    if (selectedAllpoints === true) {
      setSelectedAllPoints(false);
    } else {
      setSelectedAllPoints(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {takingPosition === true ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.buttonView}>
            <MyButton
              text="Pobierz i zapisz pozycję"
              action={alertWithGetPosition}
            />
            <MyButton text="Usuń wszystkie dane" action={deleteAllData} />
          </View>
          <View style={styles.mapSettingsView}>
            <MyButton text="Przejdź do mapy" action={moveToMapHandler} />
            <Switch
              onValueChange={changeSelectOfAllPositions}
              value={selectedAllpoints}
            />
          </View>
          <View style={{ flex: 10, backgroundColor: "white" }}>
            {dataState.length !== 0 ? (
              <FlatList
                data={dataState}
                renderItem={({ item }) => {
                  if (item.key !== undefined && item.value !== undefined) {
                    return (
                      <ListItem
                        key={item.key}
                        timestamp={JSON.parse(item.value).timestamp}
                        latitude={JSON.parse(item.value).coords.latitude}
                        longitude={JSON.parse(item.value).coords.longitude}
                        selectedPoints={selectedPoints}
                        setSelectedPoints={setSelectedPoints}
                        selectedAllpoints={selectedAllpoints}
                        setSelectedAllPoints={setSelectedAllPoints}
                      />
                    );
                  }
                }}
              />
            ) : (
              <View></View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: "row",
  },

  mapSettingsView: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
});

export default List;
