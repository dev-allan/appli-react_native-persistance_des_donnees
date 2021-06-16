import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomePage from '../screen/HomePage'
import Detail from '../screen/Detail'
import Modify from '../screen/Modify'

const Tab = createMaterialBottomTabNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="Detail" component={Detail} />
            <Tab.Screen name="Modify" component={Modify}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}