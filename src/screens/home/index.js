import React, {useEffect} from "react";
import styles from './style'
import {
    View,
    Text,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid,
    StatusBar
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

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            backButtonClick()
            return true
        }) 
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", () => {});
    },[])

    function backButtonClick() {
        BackHandler.exitApp()
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
            <ScrollView>
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
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('SavePoints')}}>
                        <Text style={styles.buttonTextTrack}>Following and save for points</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('SaveTime')}}>
                        <Text style={styles.buttonTextTrack}>Following and save for time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('ShowSave')}}>
                        <Text style={styles.buttonTextTrack}>Show follow save for points</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Layers')}}>
                        <Text style={styles.buttonTextTrack}>onPress in Layers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Distance')}}>
                        <Text style={styles.buttonTextTrack}>Distance user layer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('Background')}}>
                        <Text style={styles.buttonTextTrack}>Background tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('ShapeLayer')}}>
                        <Text style={styles.buttonTextTrack}>Shapes and Layers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('FollowUser')}}>
                        <Text style={styles.buttonTextTrack}>Follow user</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrack} onPress={() => {navigation.navigate('FollowUserManual')}}>
                        <Text style={styles.buttonTextTrack}>Follow user manual</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    ) 
}

export  default Home