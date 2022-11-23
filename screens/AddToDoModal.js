import { VStack, Heading, Input, Button, HStack } from "native-base";
import React from "react";

export default function AddToDoModal(props) {
  let [todo, setTodo] = React.useState("");
  return (
    <VStack flex={1} p={5} mt={20}>
      <Heading alignSelf="center" size="2xl" m={10}>
        Add ToDo
      </Heading>
      <Input
        placeholder="Insira tarefa"
        value={todo}
        onChangeText={setTodo}
        mb={5}
      />

      <HStack justifyContent="space-around">
        <Button
          variant="outline"
          mb={5}
          w={"45%"}
          onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }}
        >
          Adicionar
        </Button>
        <Button
          title="Cancel"
          w={"45%"}
          variant="outline"
          mb={5}
          onPress={props.onClose}
        >
          Cancelar
        </Button>
      </HStack>
    </VStack>
  );
}
