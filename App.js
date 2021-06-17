import React from 'react'
import Navigation from './src/components/navigation/Navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: '#f1c40f',
  },
};


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation/>
    </PaperProvider>
  );
}
