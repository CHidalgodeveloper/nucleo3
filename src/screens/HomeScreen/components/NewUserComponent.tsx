import { push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { dbRealTime } from "../../../configs/firebaseConfig";

interface Props {
  visible: boolean;
  setVisible: Function;
}

interface UserForm {
  name: string;
  direction: string;
  description: string;
}

export const NewUserComponent = ({ visible, setVisible }: Props) => {
  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    direction: "",
    description: "",
  });
  const handlerSetUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value });
  };

  const saveUser = async () => {
    if (!userForm.name || !userForm.direction || !userForm.description) {
      return;
    }
    //console.log(letterForm)
    const dbRef = ref(dbRealTime, "Users");
    const saveUserDb = push(dbRef);
    try {
      await set(saveUserDb, userForm);
      setUserForm({
        name: "",
        direction: "",
        description: "",
      });
    } catch (e) {
      console.log(e);
    }
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
          <View style={styles.headerModal}>
            <Text variant="headlineLarge">Nuevo Usuario</Text>
            <IconButton icon="close" onPress={() => setVisible(false)} />
          </View>
          <Divider bold />
          <TextInput
            mode="outlined"
            label="Nombre"
            onChangeText={(value) => handlerSetUserForm("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Direccion"
            onChangeText={(value) => handlerSetUserForm("direction", value)}
          />
          <TextInput
            mode="outlined"
            label="Descripcion"
            multiline={true}
            numberOfLines={7}
            onChangeText={(value) => handlerSetUserForm("description", value)}
          />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => saveUser()}
          >
            crear
          </Button>
        </Modal>
      </Portal>
    </View>
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
  item: {
    flex: 1,
    alignItems: "flex-end",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
