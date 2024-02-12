import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: '#0D0B26',
    },
    container: {
        flex: 1,
    },
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    scrollView: {
        width: '100%',
    },
    input: {
        left: 0,
        right: 0,
        bottom: 60, // Height of the NavigationBar
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
