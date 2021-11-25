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
        alignItems: 'center',
        bottom: 10,
        backgroundColor: 'rgba(800,800,800,0.2)',
        borderRadius: 7,
        marginRight: 10
    },
    textShow: {
        color: '#fff'
    },
    bottomDelete: {
        alignItems: 'center',
        bottom: 10,
        backgroundColor: 'rgba(800,800,800,0.2)',
        borderRadius: 7,
        marginLeft: 10
    },
    containerBottom: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        bottom: 10
    }
})