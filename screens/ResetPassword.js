import React from "react";
import { View, StatusBar, TextInput } from "react-native";
import {
  VStack,
  Text,
  Heading,
  Input,
  Button,
  HStack,
  Pressable,
} from "native-base";
import AppStyles from "../styles/AppStyles";

import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export function ResetPassword({ navigation }) {
  let [email, setEmail] = React.useState("");

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <VStack flex={1} p={5} mt={20}>
      <StatusBar style="auto" />
      <Heading alignSelf="center" size="2xl" m={10}>
        Recuperar senha
      </Heading>
      <Input
        placeholder="E-mail"
        mb={5}
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Reset Password"
        onPress={resetPassword}
        variant="outline"
        mb={5}
      >
        <Text>Recuperar senha</Text>
      </Button>
      <HStack alignSelf={"center"}>
        <Text>Não possui conta? </Text>
        <Pressable
          title="Cadastrar"
          variant="outline"
          mb={5}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text color={"blue.700"}>Cadastrar</Text>
        </Pressable>
      </HStack>
    </VStack>
  );
}
