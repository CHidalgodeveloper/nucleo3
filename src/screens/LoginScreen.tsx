import React, { useState } from 'react'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import {  StyleSheet, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface LoginForm{
    email: string,
    password: string
}
interface MessageSnackBar{
  visible: boolean,
  message: string,
  color: string
}

export const LoginScreen = () => { 

    const [loginForm, setLoginForm] = useState <LoginForm>({
        email:'',
        password:''
    });
    const [messageSnackBar, setMessageSnackBar] = useState <MessageSnackBar>({
      visible: false,
      message: '',
      color: 'gray'
  });

  const navigation=useNavigation();
  const [hiddenPassword, setHiddenPassword] = useState(true);

  
    const handlerSetLoginForm = (key: string, value: string) =>{
        setLoginForm({...loginForm, [key]: value})
    };

    const handlerLogin= async()=>{
      if(!loginForm.email || !loginForm.password){
        setMessageSnackBar({visible: true,message:"complete los campos",color:"red"})
       
        return;
      }
       
      try {
        const response = await signInWithEmailAndPassword(auth,loginForm.email,loginForm.password);
        setMessageSnackBar({visible: true,message:"ingreso exitoso",color:"green"})
       
      } catch (e) {
        console.log(e);
        setMessageSnackBar({visible: true,message:"no se logro completar el ingreso",color:"orange"})
        
      }
      
    }

  return (
  <View style={styles.content}>
    <Text variant="displayMedium">Login</Text>
    <TextInput
    style={styles.imput}
      mode="outlined"
      label="Correo"
      placeholder="Escribe tu correo"
      onChangeText={(value)=>handlerSetLoginForm('email',value)}
      
    />
    <TextInput
    style={styles.imput}
      mode="outlined"
      label="Password"
      placeholder="Escribe tu password"
      secureTextEntry={hiddenPassword}
      right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)} />}
      onChangeText={(value)=>handlerSetLoginForm('password',value)}
    />
   
    <Button  
    style={styles.button}
    mode="contained" 
    color= 'gray'
    dark={true}
    onPress={() => handlerLogin()}>
    Ingresar
  </Button>
  <Snackbar
    visible= {messageSnackBar.visible}
    onDismiss={()=>setMessageSnackBar({...messageSnackBar, visible: false})}
    style={{backgroundColor:messageSnackBar.color}}>
    {messageSnackBar.message}
  </Snackbar>
  <Text 
  onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}
  style={styles.textNav}>
    No tienes una cuenta? Registrate ahora</Text>
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