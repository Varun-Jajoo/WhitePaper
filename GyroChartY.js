import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Gyroscope } from 'expo-sensors';

const GyroChartY = () => {
  const [gyroYData, setGyroYData] = useState([]); // Change variable name to gyroYData
  const [cardData, setCardData] = useState([0]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const subscribeToGyroscope = async () => {
      Gyroscope.setUpdateInterval(1000);

      Gyroscope.addListener(({ y }) => { // Change to
        setGyroYData((prevData) => [...prevData, y]); // Change to y
      });
    };

    subscribeToGyroscope();

    return () => {
      Gyroscope.removeAllListeners();
    };
  }, []);

  function changeCardData() {
    if (counter < gyroYData.length - 1) { // Change to gyroYData
      setCounter(counter + 1);
      const y = gyroYData[counter + 1]; // Change to y
      if (y === undefined) return;
      setCardData((prev) => [...prev, y]);
    } else {
      setCounter(0);
      const y = gyroYData[0]; // Change to 
      if (y === undefined) return;
      setCardData((prev) => [...prev, y]);
    }
    if (cardData.length > 10) {
      setCardData(cardData.slice(10, cardData.length));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeCardData();
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <View style={{ marginLeft: 6, marginTop: 0 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 ,paddingVertical:10,paddingLeft:10}}>
        Gyroscope (Y-Axis) {/* Update label*/}
      </Text>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: cardData,
              strokeWidth: 0.5,
            },
          ],
        }}
        width={Dimensions.get("window").width - 45}
        height={150}
        withInnerLines={false}
        withOuterLines={false}
        fromZero={true}
        useShadowColorFromDataset={true}
        chartConfig={{
          backgroundColor: "#1fffff",
          backgroundGradientFrom: "#1c1c1c",
          backgroundGradientTo: "#1c1c1c",
          decimalPlaces: 2,

          color: (opacity = 1, value) => {
            return value < -2 || value > 2
              ? "rgba(255, 0, 0, " + opacity + ")"
              : "rgba(0, 255, 0, " + opacity + ")";
          },

          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: "3",
          },
        }}
        style={{
          marginBottom: 50,
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default GyroChartY;
