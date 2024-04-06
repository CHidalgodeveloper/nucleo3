import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, FAB, IconButton, MD3Colors, Modal, PaperProvider, Portal, Text, TextInput } from "react-native-paper";
import { auth, dbRealTime } from "../../configs/firebaseConfig";
import firebase from 'firebase/auth'

import { onValue, ref } from "firebase/database";
import { UserCardComponent } from "./components/UserCardComponent";
import { NewUserComponent } from "./components/NewUserComponent";


export interface User{
    id: string,
    name: string,
    direction: string,
    description: string
}

export const HomeScreen = () => {
    

    const logout = async() => {
        await signOut(auth)
        const { NativeModules } = require('react-native');
        NativeModules.DevSettings.reload();

    };
    
    
    const [visibleFab, setVisibleFab] = useState(false);


  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

  const [listaUsuarios, setListaUsuarios] = useState<User[]>([
  ])


  useEffect(() => {
        getAllUsers()
        setUserAuth(auth.currentUser)
       
     
    }
  , []);

  

 

  const getAllUsers=()=>{
    const dbRef=ref(dbRealTime,'Users')
    onValue(dbRef,(snapshot)=>{
      const data = snapshot.val()
      const getKeys= Object.keys(data)
      const listUser: User[]=[]
      getKeys.forEach((key)=>{
          const value={...data[key], id:key}
          listUser.push(value)

      })
      setListaUsuarios(listUser)
    })

  }

  return (
    <>
    <View style={styles.contentHome}>
      <View style={styles.header}>
        <Avatar.Text size={85} label="GM" />

        <View style={styles.header}>
          <Text variant="bodySmall"> Bienvenido </Text>
          <Text variant="labelLarge"> {userAuth?.displayName} </Text>
        </View>
        <View style={styles.item}>
        <IconButton
            icon="logout"
            iconColor={MD3Colors.neutral20}
            size={20}
            mode='contained'
            onPress={() => logout()}
        />
        </View>
       

        
      </View>
      <View>
      <FlatList
        data={listaUsuarios}
        renderItem={({item}) => <UserCardComponent user={item}/>}
        keyExtractor={item => item.id}
      />
      
      </View>

      
    </View>
   
    
    <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => setVisibleFab(true)}
  />
  <NewUserComponent visible={visibleFab} setVisible={setVisibleFab}/>
 
  </>
  );
};
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
fab: {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
},
});
