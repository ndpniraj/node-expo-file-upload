import { StyleSheet, Button, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { apiUrl } from "./url";

export default function App() {
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });

      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const audioFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      formData.append("audioFile", audioFile as any);

      const { data } = await axios.post(apiUrl, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick something" onPress={pickSomething} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
