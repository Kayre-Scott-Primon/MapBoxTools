import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    map: {
        flex: 1
    },
    head: {
        position: 'absolute',
        alignSelf: 'center',
    }, 
    textInfo: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        margin: 2,
        fontWeight: '500'
    },
    textButton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    button: {
        position:'absolute',
        alignSelf: 'center',
        bottom: 15,
        backgroundColor: '#f33',
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    }
})