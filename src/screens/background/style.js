import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#03a',
    },
    head: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginVertical: 20 ,
        marginHorizontal: 10
    }, 
    textInfo: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        margin: 2,
        fontWeight: '500'
    },
    button: {
        marginHorizontal: 10,
        marginVertical: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center'
    },
    textButton: {
        fontSize: 25,
        color: 'white',
        fontWeight: '600',
        marginVertical: 10
    },
    coords: {
        color: 'orange',
        fontSize: 30,
        alignSelf: 'center',
        marginVertical: 25,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        borderRadius: 5
    },
    coordsList: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    }
})