import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomePage from '../screen/HomePage'
import Detail from '../screen/Detail'
import Modify from '../screen/Modify'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="HomePage" 
              component={HomePage} 
              options={{
                title:"Accueil",
                headerStyle:{
                  backgroundColor: '#FEC551'
              }
            }}/>
            <Stack.Screen 
              name="Detail" 
              component={Detail} 
              options={{
                title:"Détail du livre",
                headerStyle:{
                  backgroundColor: '#FEC551'
                }
            }}/>
            <Stack.Screen 
              name="Modify" 
              component={Modify}
              options={{
                title:"Modifier le livre",
                headerStyle:{
                  backgroundColor: '#FEC551'
                }
            }}  
              />
        </Stack.Navigator>
    </NavigationContainer>
  );
}