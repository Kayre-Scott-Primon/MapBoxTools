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
        backgroundColor: 'rgba(25,51,103,0.5)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 18,
        justifyContent: 'center',
    },
    labelButton: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        margin: 2,
        fontWeight: '700'
    },
    dividerButton: {
        height: '100%',
        width: 2,
        backgroundColor: '#fff',
        marginHorizontal: 8,
        paddingHorizontal: 2,
        borderRadius: 3
    }

})