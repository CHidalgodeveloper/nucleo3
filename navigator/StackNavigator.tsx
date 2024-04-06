import { createStackNavigator } from '@react-navigation/stack';


import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { auth } from '../src/configs/firebaseConfig';
import { LoginScreen } from '../src/screens/LoginScreen';
import { RegisterScreen } from '../src/screens/RegisterScreen';
import { HomeScreen } from '../src/screens/HomeScreen/HomeScreen';
import { DetailScreen } from '../src/screens/HomeScreen/DetailScreen';


interface Routes{
    name: string,
    screen: ()=>JSX.Element,
    headerShow?: boolean,
    title?:string
}

const Stack = createStackNavigator();

export const StackNavigator=()=> {

  const [isAuth, setIsAuth] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      setIsLoading(true)
      onAuthStateChanged(auth,(user)=>{
    if(user){
      
      setIsAuth(true)
    }
    setIsLoading(false)
    })
    }, [])
    

    const routesNoAuth: Routes[]=[
        {name:'Login',screen: LoginScreen,headerShow:false},
        {name:'Register',screen: RegisterScreen,headerShow:false}
    ]
    const routesAuth: Routes[]=[
        {name:'Home',screen: HomeScreen,headerShow:false},
        {name:'Register',screen: RegisterScreen,headerShow:false},
        {name:'Detail',screen: DetailScreen,headerShow:true, title: 'Detalle de Cliente'}
    ]
  return (
    <>
    {
      isLoading?
      <View style={styles.content}>
      <ActivityIndicator animating={true} size={35}/>
    </View>
    :
    
   
    <Stack.Navigator>
     {
      isAuth?
     routesAuth.map((item, index)=>(
       <Stack.Screen key={index} name={item.name} options={{headerShown:item.headerShow}} component={item.screen} />
     ))
     :
     routesNoAuth.map((item, index)=>(
      <Stack.Screen key={index} name={item.name} options={{headerShown:item.headerShow,title:item.title}}  component={item.screen} />
    ))
    }
   
    
   </Stack.Navigator>
}
   </>
  );

}
const styles=StyleSheet.create({
  content:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
  },
  imput:{
      width: '90%',

  },
  button:{
      width: '50%',


  },
  textNav:{
    marginTop: 10,
    fontSize: 15,
    color: "#7559f38a",
    fontWeight: 'bold',
  }

})