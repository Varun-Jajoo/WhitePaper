import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GyroChart from './GyroChart'
import GyroChartY from './GyroChartY'
import GyroChartZ from './GyroChartZ'

export default function App() {
  return (
  <ScrollView>
    <View style={{marginVertical:20}}>
      <GyroChart/>
      
    </View>
    <View style={{marginVertical:20}}>
      <GyroChartY/>
      
    </View><View style={{marginVertical:20}}>
      <GyroChartZ/>
      
    </View>
    
    </ScrollView>
  )
}