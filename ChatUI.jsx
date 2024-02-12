import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react'
import { fetch } from 'react-native-fetch-api'
import 'react-native-polyfill-globals/auto'
import { View, Text, Image, Button, Platform, ScrollView, StyleSheet, StatusBar, SafeAreaView, Keyboard } from 'react-native';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles/ChatUI.style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalStateContext } from './GlobalStateProvider';

const timeStamper = () => {
    return new Date().toLocaleTimeString('en-US', {
        month: 'short', // Full month name
        day: '2-digit', // 2-digit day
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Use AM/PM format
    })
}

let abortController = null;
const FINISHED_STREAM = "data: [DONE]"
const GPT_IMG = require('./img/gpt-logo.png');

const ChatUI = () => {
    const { apiKey, modelName } = useContext(GlobalStateContext);
    const [messages, setMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const navigation = useNavigation();
    const scrollViewRef = useRef();


    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            <Icon
            name="refresh"
            size={24}
            color="#FFFFFF"
            onPress={() => {
              setMessages([])
            }}
            style={{ marginRight: 20 }}
          />
        ),
      });
    }, [navigation]);



    const handleSendMessage = (text) => {
        const newMessage = {
            text: text,
            time: timeStamper(),
            isSender: true,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        genGPT(text)
    };


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const _keyboardDidShow = () => {
        scrollToBottom();
    };

    const scrollToBottom = () => {
        if(scrollViewRef.current != null)
            scrollViewRef.current.scrollToEnd({ animated: true });
    }

    const handleGPTResponse = (text, id) => {
        setMessages(prevMessages => {
            const tempIndex = prevMessages.findIndex(msg => msg.id == id);
            if (tempIndex !== -1) {
                // Update existing message
                const updatedMessages = [...prevMessages];
                updatedMessages[tempIndex] = { ...updatedMessages[tempIndex], text: text, };
                return updatedMessages;
            } else {
                // Add new message
                const newMessage = {
                    text: text,
                    time: timeStamper(),
                    isSender: false,
                    id: id,
                };
                return [...prevMessages, newMessage];
            }
        });
        scrollToBottom();
    };

    const handleGPTError = (text, id) => {
        setMessages(prevMessages => {
            const tempIndex = prevMessages.findIndex(msg => msg.id == id);
            if (tempIndex !== -1) {
                // Update existing message
                const updatedMessages = [...prevMessages];
                updatedMessages[tempIndex] = {
                    text: text,
                    time: timeStamper(),
                    isSender: false,
                    id: id,
                    error: true
                };
                return updatedMessages;
            } else {
                // Add new message
                const newMessage = {
                    text: text,
                    time: timeStamper(),
                    isSender: false,
                    id: id,
                    error: true
                };
                return [...prevMessages, newMessage];
            }
        });
        scrollToBottom();
    };

    // React Native work around because we can't iterate over async objects.
    async function genGPT(text) {
        setIsGenerating(true)
        abortController = new AbortController();
        const { signal } = abortController;
        let done = false;
        let completeResponse = '';
        let id = uuidv4();
        handleGPTResponse('', id);

        try {
            const url = 'https://api.openai.com/v1/chat/completions';
            const response = await fetch(url, {
                reactNative: { textStreaming: true },
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`, // Replace with your actual API key
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Really we should pass the full context..
                    messages: [{ role: 'user', content: text }],
                    model: modelName,
                    stream: true,
                }),
                signal,
            });

            const reader = response.body.getReader();
            console.log("Starting new stream... with model: ",modelName);

            while (!done) {
                const { value, done: streamDone } = await reader.read();
                done = streamDone;
                if (!done) {
                    const chunk = new TextDecoder().decode(value);
                    console.log("New Chunk:", chunk);
                    // Process each chunk as it arrives
                    const messages = chunk.split('\n').filter(line => line.startsWith('data:'));
                    messages.forEach(message => {
                        if (message == FINISHED_STREAM) return;
                        const data = JSON.parse(message.substring(6));
                        if (data.choices[0].delta.content) {
                            completeResponse += data.choices[0].delta.content;
                            handleGPTResponse(completeResponse, id);
                        }
                    });
                    try {
                        // Custom error handler for the API
                        const error = JSON.parse(chunk)
                        console.log(error)
                        if(error != null){
                            handleGPTError(error.error.code, id);
                        }
                    } catch (e) {
                        // nothing
                    }

                }
            }
            console.log('Streaming complete.');
            setIsGenerating(false)
        } catch (e) {
            if(e.message.toUpperCase() == "ABORTED")
                handleGPTResponse(completeResponse + "... [Aborted by user]", id);

        }
    }

    // Method to cancel the fetch operation
    const cancelGPTRequest = () => {
        abortController.abort();
        console.log('GPT request canceled');
        setIsGenerating(false)
    }

    

    
    

    return (
        <View style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                {messages.length > 0 ? (
                    <ScrollView contentContainerStyle={styles.messagesContainer} style={styles.scrollView} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                        {messages.map((msg, index) => (
                            <MessageBubble key={index} text={msg.text} time={msg.time} isSender={msg.isSender} error={msg.error} />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.centeredView}>
                        <Image source={GPT_IMG} style={{opacity: 0.4, height: 60, width: 60, marginBottom: 20}}></Image>
                        <Text style={{color: "white", opacity: 0.4}}>New conversation.. please ask a question</Text>
                    </View>
                )}
                <MessageInput onSendMessage={handleSendMessage} onAbort={cancelGPTRequest} isGenerating={isGenerating} />
            </SafeAreaView>
        </View>
    )
};

export default ChatUI;
