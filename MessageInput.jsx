import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Image, Keyboard } from 'react-native';
import styles from './styles/MessageInput.style'

const CANCEL_ICON = require('./img/cancel.png');
const SEND_ICON = require('./img/send.png');

const MessageInput = ({ onSendMessage, onAbort, isGenerating }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (isGenerating) {
      onAbort();
      return;
    }
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const buttonImage = isGenerating ? CANCEL_ICON : SEND_ICON;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write a message..."
        placeholderTextColor="#ffffff80"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Image source={buttonImage} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
