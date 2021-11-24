import React, {useEffect} from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'

function Home({navigation}){

    async function permission(){
        try{
            const granted = await PermissionsAndroid.request(
                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
            }else{
            }
        }catch(e){
            console.log('error ' + e)
        }
    }

    useEffect(() => {permission()})

    return(
        <View style={styles.container}>
            <Text style={styles.textInfo}>Aplicativo voltado para testes com MapBox no ReactNative a fim de se explorar os recursos disponiveis e analizar qual a melhor opção e melhor configurações para alguns usos</Text>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('MarkPoint')}}>
                    <Text style={styles.buttonTextTrack}>Marcar pontos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Track')}}>
                    <Text style={styles.buttonTextTrack}>Tracking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Follow')}}>
                    <Text style={styles.buttonTextTrack}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Save')}}>
                    <Text style={styles.buttonTextTrack}>Save Following</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('ShowSave')}}>
                    <Text style={styles.buttonTextTrack}>Show follow save</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) 
}

export  default Home