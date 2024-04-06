import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';



export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
   
  );
}
