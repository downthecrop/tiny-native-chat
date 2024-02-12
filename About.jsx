import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const About = () => {

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>TinyNativeGPT is a sleek React Native chat interface designed for seamless integration with GPT AI model APIs. It's a hobbyist's playground, offering token streaming for lively interactions and an open-source framework for endless customization. Dive into the future of AI chats with TinyNativeGPT.</Text>
        <Text style={styles.title}>Acknowledgements</Text>
        <Text style={{color: 'white'}}>AI by SBTS from Noun Project (CC BY 3.0)</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      color: '#ffffff', // Adjust the color to fit your app theme
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: '#666', // Adjust the color to fit your app theme
    },
    input: {
      height: 40,
      width: '100%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default About;
