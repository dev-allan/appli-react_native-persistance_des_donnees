//Importation React
import React from 'react'
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'

//importation Screen
import HomePage from './src/components/screen/HomePage'
import Detail from './src/components/screen/Detail'
import Modify from './src/components/screen/Modify'


export default function App() {
  return (
    <View>
      <HomePage/>
    </View>
  );
}
