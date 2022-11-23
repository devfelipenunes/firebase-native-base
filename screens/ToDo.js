import React from "react";
import {
  Button,
  VStack,
  Pressable,
  View,
  Text,
  HStack,
  Box,
} from "native-base";

import { ActivityIndicator, FlatList, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { sendEmailVerification } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import AddToDoModal from "./AddToDoModal";
import { AntDesign } from "@expo/vector-icons";

import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ToDo({ navigation, route }) {
  let [isLoading, setIsLoading] = React.useState(true);
  let [modalVisible, setModalVisible] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);
  let [isRefreshing, setIsRefreshing] = React.useState(false);

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  let loadToDoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    console.log(toDos);
    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id === toDoId);
    setToDos(updatedToDos);
  };

  let showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, "todos", item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let renderToDoItem = ({ item }) => {
    return (
      <HStack marginY={5} justifyContent="space-between">
        <BouncyCheckbox
          isChecked={item.complated}
          size={25}
          fillColor="#black"
          unfillColor="#FFFFFF"
          text={item.text}
          iconStyle={{ borderColor: "black" }}
          onPress={(isChecked) => {
            checkToDoItem(item, isChecked);
          }}
        />
        <Pressable
          title="Delete"
          color="#258ea6"
          onPress={() => deleteToDo(item.id)}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </HStack>
    );
  };

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
        {/* <Button
          variant="outline"
          mb={5}
          title="Add ToDo"
          onPress={() => setModalVisible(true)}
          color="#fb4d3d"
        >
          Adicionar
        </Button> */}
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Por favor verificar email</Text>
        <Button
          title="Verificar Email"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>
    );
  };

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };

    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);

    console.log(docRef);
  };

  return (
    <VStack flex={1} p={5} mt={5}>
      <HStack justifyContent="space-between" mb={10}>
        <Pressable
          color="#258ea6"
          onPress={() => navigation.navigate("ManageAccount")}
          variant="outline"
          mb={5}
        >
          <AntDesign name="setting" size={24} color="black" />
        </Pressable>
        <Pressable
          variant="outline"
          mb={5}
          title="logout"
          onPress={logout}
          alignSelf="flex-end"
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>
      </HStack>
      <Box h={"70%"} mb={5} borderWidth="0.5" p={5}>
        {auth.currentUser.emailVerified
          ? showContent()
          : showSendVerificationEmail()}
      </Box>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>
      <Button
        variant="outline"
        mb={5}
        title="Add ToDo"
        onPress={() => setModalVisible(true)}
        color="#fb4d3d"
      >
        Adicionar
      </Button>
    </VStack>
  );
}
