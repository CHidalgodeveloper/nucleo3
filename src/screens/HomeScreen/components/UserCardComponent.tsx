import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, MD3Colors, Text } from 'react-native-paper'
import { User } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props{
    user: User
}

export const UserCardComponent = ({user}:Props) => {

    const navigation= useNavigation()
  return (
    <View style={styles.letter}>
        <View>
        <Text variant='labelLarge'>Nombre: {user.name}</Text>
        <Text variant='bodyMedium'>Direccion: {user.direction}</Text>
        </View>
        <View style={styles.item}>
        <IconButton
            
            icon="guy-fawkes-mask"
            iconColor={MD3Colors.neutral20}
            size={25}
            mode='contained'
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail',params:{user}}))}
        />
        </View>
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
  letter:{
    flexDirection:'row',
    paddingHorizontal:10,
    paddingVertical:30
  }
  });
  
