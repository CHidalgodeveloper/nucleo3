import React, { useState } from 'react'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import {  StyleSheet, View } from 'react-native'
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Restart from 'react-native-restart';

interface RegisterForm{
    user:string,
    email: string,
    password: string
}
interface MessageSnackBar{
  visible: boolean,
  message: string,
  color: string
}



export const RegisterScreen = () => { 

    const [registerForm, setRegisterForm] = useState <RegisterForm>({
        user:'',
        email:'',
        password:''
    });
    const [messageSnackBar, setMessageSnackBar] = useState <MessageSnackBar>({
      visible: false,
      message: '',
      color: 'gray'
  });
    const navigation=useNavigation();

    
    const [hiddenPassword, setHiddenPassword] = useState(true)

    
    const handlerSetRegisterForm = (key: string, value: string) =>{
        setRegisterForm({...registerForm, [key]: value})
    };

    const handlerRegister= async()=>{
      if(!registerForm.email || !registerForm.password||!registerForm.user){
        setMessageSnackBar({visible: true,message:"complete los campos",color:"red"})
        
        return;
      }
      
      try {
        const response = await createUserWithEmailAndPassword(auth,registerForm.email,registerForm.password);
        const user = auth.currentUser;

  
        await updateProfile(user!, {
        displayName: registerForm.user
        
        });
        await signOut(auth);
      
        
        
        setMessageSnackBar({visible: true,message:"registro exitoso",color:"green"})
        
        
      } catch (e) {
        console.log(e);
        setMessageSnackBar({visible: true,message:"no se logro completar el registro",color:"orange"})
        
      }
      
      await signOut(auth)
    
    }

    const logOut=async () => {
        const { NativeModules } = require('react-native');
        NativeModules.DevSettings.reload();
    }
       

  return (
  <View style={styles.content}>
    <Text variant="displayMedium">Registro Administrador</Text>
    <TextInput
    style={styles.imput}
      mode="outlined"
      label="usuario"
      placeholder="Escribe tu usuario"
      onChangeText={(value)=>handlerSetRegisterForm('user',value)}
      
    />
    <TextInput
    style={styles.imput}
      mode="outlined"
      label="Correo"
      placeholder="Escribe tu correo"
      onChangeText={(value)=>handlerSetRegisterForm('email',value)}
      
    />
    <TextInput
    style={styles.imput}
      mode="outlined"
      label="Password"
      placeholder="Escribe tu password"
      secureTextEntry={hiddenPassword}
      right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)} />}
      onChangeText={(value)=>handlerSetRegisterForm('password',value)}
    />
   
    <Button  
    style={styles.button}
    mode="contained" 
    onPress={() => handlerRegister()}>
    Registrar
  </Button>
  <Snackbar
    visible= {messageSnackBar.visible}
    onDismiss={()=>setMessageSnackBar({...messageSnackBar, visible: false})}
    style={{backgroundColor:messageSnackBar.color}}>
    {messageSnackBar.message}
  </Snackbar>
  <Text 
  onPress={()=>logOut()}
  style={styles.textNav}>
    Inicia sesion</Text>
    </View>
   
  )
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