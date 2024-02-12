import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative', // Needed for absolute positioning of the send button
    },
    input: {
      color: 'white',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
      flex: 1,
      height: 54,
      backgroundColor: '#4F5E7B',
      paddingHorizontal: 20,
      paddingRight: 50, // Increased right padding to avoid text overlapping with the button
      borderRadius: 20,
    },
    sendButton: {
      position: 'absolute', // Position the send button absolutely to overlay it on the input
      right: 10, // Adjust the right position to align the button inside the input box
      height: '100%', // Match the height of the input box
      justifyContent: 'center', // Center the button icon vertically
      paddingHorizontal: 10, // Padding around the button for easier tapping
    },
    buttonIcon: {
      width: 28,
      height: 28,
      opacity: 0.6,
    },
  });