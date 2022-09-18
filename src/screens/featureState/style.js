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
        margin: 5,
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
        marginHorizontal: 10,
        backgroundColor: 'rgba(800,800,800,0.2)',
        borderRadius: 7
    },
    conteinerButtons: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        bottom: 10
    },
    textShow: {
        color: '#fff'
    },
    foot: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 100
    },
    textShare: {
        color: '#fff',
        fontSize: 20
    },
    textShowShare: {
        color: '#3f4',
        fontSize: 18,
        fontWeight: '700'
    },
    buttonShowShare: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(68, 85, 102,0.75)',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonFeature: {
        position: 'absolute',
        backgroundColor: '#f00',
        padding: 15,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center',
        bottom: '5%'
    },
    labelFeature: {
        color: '#fff',
        fontSize: 20
    }
})