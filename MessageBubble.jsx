import React from 'react';
import { View, Text } from 'react-native';
import BouncingDots from './BouncingDots';
import styles from './styles/MessageBubble.style';

const MessageBubble = ({ text, time, isSender, error }) => {
  let content;

  if (error) {
    // Display error message
    content = (
      <Text style={{ color: 'white', fontSize: 16 }}>
        {text || 'An error occurred. Please try again.'} {/* Default error message or use the provided text */}
      </Text>
    );
  } else if (text === '') {
    // Display loading indicator
    content = (
      <View style={styles.dotsWrapper}>
        <BouncingDots />
      </View>
    );
  } else {
    // Display the message text
    content = (
      <Text style={{ color: 'white', fontSize: 16 }} selectable={true}>
        {text}
      </Text>
    );
  }

  return (
    <View style={{
      maxWidth: '70%',
      alignSelf: isSender ? 'flex-end' : 'flex-start',
      backgroundColor: error ? '#E74C3C' : (isSender ? '#2F80ED' : '#4F5E7B'), // Use a red background for errors
      borderRadius: 8,
      padding: 10,
      marginHorizontal: 8,
      marginBottom: 8,
    }}>
      {content}
      {!error && ( // Only show the time if there's no error
        <Text style={{ color: 'white', fontSize: 10, alignSelf: 'flex-end', marginTop: 4 }}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default MessageBubble;
