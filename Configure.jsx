import React, { useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput } from 'react-native';
import { GlobalStateContext } from './GlobalStateProvider';
import styles from './styles/Configure.style';


const Configure = () => {

  const { apiKey, setApiKey } = useContext(GlobalStateContext);



    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.description}>
          Enter your API key to configure TinyNativeGPT with your GPT AI model.
        </Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Enter API Key"
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor='gray'
          autoCorrect={false}
        />
        <DropdownExample></DropdownExample>
      </View>
    );
}

const DropdownExample = () => {
  const { setModelName, modelName } = useContext(GlobalStateContext);

  return (
    <View style={{ flex: 1, paddingTop: 40, alignItems: "center" }}>
      <Text style={styles.title}>Select a model</Text>
      <View style={styles.card}>
      <Picker
        selectedValue={modelName}
        arrowIconStyle={{tintColor: 'red'}}
        style={{ flex: 1, height: 64, border: 1, borderWidth: 1, bordercolor: 'white', color: 'white' }}
        onValueChange={(itemValue, itemIndex) => setModelName(itemValue)}
      >
        <Picker.Item label="gpt-4-turbo-preview" value="gpt-4-turbo-preview" />
        <Picker.Item label="gpt-4-1106-preview" value="gpt-4-1106-preview" />
        <Picker.Item label="gpt-4" value="gpt-4" />
        <Picker.Item label="gpt-3.5-turbo-16k-0613" value="gpt-3.5-turbo-16k-0613" />
      </Picker>
      </View>
    </View>
  );
};

export default Configure;
