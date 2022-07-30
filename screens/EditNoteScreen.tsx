import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { RootStackParamList, ScreenNavigationStackProp } from "../App";
import { DeleteNote } from "../components/DeleteNote";
import { NoteTakingInput } from "../components/NoteTakingInput";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note, saveNote } from "../services/noteStoreService";

type EditScreenRouteProp = RouteProp<RootStackParamList, "EditNote">;

export const EditNoteScreen: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationStackProp>();
  const noteId = route.params.noteId;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: noteId ? "Edit note" : "New note",
      headerRight: () => (noteId ? <DeleteNote noteId={noteId} /> : <></>),
    });
  }, [navigation]);

  return <NoteTakingInput noteId={noteId} />;
};

export const SaveNote: React.FC<Note> = ({ text, id }) => {
  const navigation = useNavigation<ScreenNavigationStackProp>();

  const saveNoteAndNavigateHome = async () => {
    await saveNote(text, id);
    navigation.navigate("Home");
  };

  return (
    <Pressable onPress={saveNoteAndNavigateHome}>
      <Ionicons name="chevron-back" size={30} color="#ffb703" />
    </Pressable>
  );
};
