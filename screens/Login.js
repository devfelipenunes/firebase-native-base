import React from "react";
import { StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  VStack,
  Text,
  Heading,
  Input,
  Pressable,
  Icon,
  Button,
  HStack,
} from "native-base";

import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export function Login({ navigation }) {
  let [show, setShow] = React.useState(false);
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState(false);

  if (auth.currentUser) {
    navigation.navigate("ToDo");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("ToDo");
      }
    });
  }

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  return (
    <VStack flex={1} p={5} mt={20}>
      <StatusBar style="auto" />

      <Heading alignSelf="center" size="2xl" m={10}>
        Login
      </Heading>
      <Input
        placeholder="E-mail"
        mb={5}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        mb={5}
        value={password}
        onChangeText={setPassword}
        type={show ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <HStack justifyContent="space-around">
        <Button
          title="Login"
          w={"45%"}
          variant="outline"
          mb={5}
          onPress={login}
        >
          <Text>Entrar</Text>
        </Button>
        <Button
          title="Sign Up"
          variant="outline"
          w={"45%"}
          mb={5}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text>Cadastrar</Text>
        </Button>
      </HStack>
      <Button
        title="Reset"
        variant="outline"
        mb={5}
        onPress={() => navigation.navigate("ResetPassword")}
      >
        <Text>Esqueci minha senha</Text>
      </Button>
    </VStack>
  );
}
