import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput, MD3Colors } from 'react-native-paper';

import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';
import { User } from './HomeScreen';



export const DetailScreen = () => {

    const navigation=useNavigation()
  
    const route=useRoute()
    //@ts-ignore
    const {user}=route.params
    
    //console.log(letter)
    const [deatailForm, setDeatailForm] = useState<User>({
        id: '',
        name:'',
        direction:'',
        description:''
    })
    useEffect(() => {
     setDeatailForm(user)
    }, [])

    const handlerSetDetailForm=(key:string,value:string)=>{
        setDeatailForm({...deatailForm,[key]:value})
    }

    const handlerUpdateUser=async()=>{

        const dbRef=ref(dbRealTime,'Users/'+deatailForm.id)
        await update(dbRef,{direction:deatailForm.direction,description:deatailForm.description})
        navigation.goBack()
    }

    const handlerDeleteUser= async()=>{
        const dbRef=ref(dbRealTime,'Users/'+deatailForm.id)
        await remove(dbRef)
        navigation.goBack()
    }
    

  return (
   <View style={styles.contentDetail}>
        <Text variant='headlineSmall'>Usuario:{deatailForm.name}</Text>
        <TextInput
        mode='outlined'
        label='Direccion'
        value={deatailForm.direction}
        onChangeText={(value)=>handlerSetDetailForm('direction',value)}
        
        />
        <TextInput
        mode='outlined'
        label='message'
        multiline={true}
        numberOfLines={7}
        value={deatailForm.description}
        onChangeText={(value)=>handlerSetDetailForm('description',value)}
        
        />
        <Button
        style={styles.button}
        mode='contained'
        icon='email-sync'
        onPress={()=>handlerUpdateUser()}
        >Modificar</Button>
        
        <Button
        buttonColor='red'
        style={styles.button}
        mode='contained'
        icon='delete'
        onPress={()=>handlerDeleteUser()}
        >Eliminar</Button>


   </View>

  )
}
const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    imput: {
      width: "90%",
    },
    button: {
      width: "50%",
      marginTop: 20,
    },
    textNav: {
      marginTop: 10,
      fontSize: 15,
      color: "#7559f38a",
      fontWeight: "bold",
    },
    contentHome: {
      flex: 1,
      marginVertical: 50,
      marginHorizontal: 20,
  
      gap: 10,
    },
    header: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    item:{
      flex: 1,
      alignItems: 'flex-end'
    },
    containerStyle :
    {backgroundColor: 'white', 
    padding: 20,
    marginHorizontal:20,
    borderRadius:10
  },
  headerModal:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  contentDetail:{
    flex:1,
    paddingHorizontal:20,
    backgroundColor: '#fff',
    gap:20
  }
  });
  
