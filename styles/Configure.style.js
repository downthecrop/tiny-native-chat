import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
      color: "white",
      height: 40,
      width: '100%',
      margin: 12,
      borderWidth: 1,
      borderColor: "#fff",
      padding: 10,
      
    },
    card:{
      borderWidth: 1,
      width: '100%',
      borderColor: "rgba(155,155,155,1)",
      marginTop: 10,
      flexDirection: 'row',
    },
});