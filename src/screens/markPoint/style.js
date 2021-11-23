import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
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
    map: {
        flex: 1
    },
    footer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        flexDirection: 'row'
    }, 
    buttonMarkPoint:{
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#333',
        backgroundColor: 'rgba(200,200,200,0.4)'
    },
    buttonTextMarkPoint:{
        color: '#ddd',
        fontWeight: '400',
        fontSize: 18
    },
})