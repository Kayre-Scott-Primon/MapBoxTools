import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    containerMain: {
        backgroundColor: '#f58',
        flex: 1
    },
    textInfo: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        margin: 2,
        fontWeight: '700'
    },
    containerTitle: {
        position: 'absolute',
        alignSelf: 'center',
        top: 12
    },
    containerMap: {
        flex: 1
    },
    containerButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'rgba(123,231,132,0.5)',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 18
    },
    labelButton: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        margin: 2,
        fontWeight: '700'
    }

})