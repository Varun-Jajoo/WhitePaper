import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Gyroscope } from 'expo-sensors';
import GyroChartY from "./GyroChartY";

const GyroChart = () => {
  const [gyroXData, setGyroXData] = useState([]);
  const [cardData, setCardData] = useState([0]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const subscribeToGyroscope = async () => {
      Gyroscope.setUpdateInterval(1000); 

      Gyroscope.addListener(({ x }) => {
        setGyroXData((prevData) => [...prevData, x]);
      });
    };

    subscribeToGyroscope();

    return () => {
      Gyroscope.removeAllListeners();
    };
  }, []);

  function changeCardData() {
    if (counter < gyroXData.length - 1) {
      setCounter(counter + 1);
      const x = gyroXData[counter + 1];
      if (x === undefined) return;
      setCardData((prev) => [...prev, x]);
    } else {
      setCounter(0);
      const x = gyroXData[0];
      if (x === undefined) return;
      setCardData((prev) => [...prev, x]);
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
    <View style={{ marginLeft: 6, marginBottom: -86 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, position: "absolute", top: 12 }}>
        Gyroscope (X-Axis)
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
          decimalPlaces: 2, // Adjust as 

          color: (opacity = 1, value) => {
            // Customize the color based on value
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
          marginVertical: 90,
          borderRadius: 8,
        }}
      />
      <GyroChartY/>
    </View>
  );
};

export default GyroChart;
