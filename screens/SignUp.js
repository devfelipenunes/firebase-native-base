import React from "react";
import { StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  VStack,
  Heading,
  Text,
  HStack,
  Input,
  Button,
  Pressable,
  Icon,
} from "native-base";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export function SignUp({ navigation }) {
  let [show, setShow] = React.useState(false);
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setconfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validadeAndSet = (value, valueToCompare, setValeu) => {
    if (value !== valueToCompare) {
      setValidationMessage("Password do no match.");
    } else {
      setValidationMessage("");
    }
    setValeu(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("ToDo", { user: userCredential.user });
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
  };

  return (
    <VStack flex={1} p={5} mt={20}>
      <StatusBar style="auto" />
      <Heading alignSelf="center" size="2xl" m={10}>
        Sign Up
      </Heading>
      <Text>{validationMessage}</Text>
      <Input
        placeholder="E-mail"
        value={email}
        mb={5}
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

      <Input
        placeholder="Confirm Password"
        mb={5}
        value={confirmPassword}
        onChangeText={setconfirmPassword}
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
      <Button title="Sign Up" variant="outline" mb={5} onPress={signUp}>
        <Text>Cadastrar</Text>
      </Button>

      <HStack alignSelf="center">
        <Text>Já possui cadastro ?</Text>
        <Pressable
          title="Login"
          variant="outline"
          mb={5}
          onPress={() => navigation.navigate("Login")}
        >
          <Text color={"blue.700"}> login</Text>
        </Pressable>
      </HStack>
    </VStack>
  );
}
