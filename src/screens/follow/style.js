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
    containerShow: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'rgba(200,200,200,0.4)',
        backgroundColor: 'rgba(300,300,300,0.4)',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        bottom: 100,
        maxHeight: 400,
        right: 10,
        left: 10
    },
    iconShow: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(800,800,800,0.2)',
        borderRadius: 7
    },
    textShow: {
        color: '#fff'
    }
})