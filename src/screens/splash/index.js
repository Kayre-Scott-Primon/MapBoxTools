import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native'


function Splash({navigation}){

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        },1200)
    },[])
  
    return(
        <View style={styles.container}>
        <StatusBar backgroundColor={'#03a'} barStyle={"light-content"}/>
            <Image source={require('../../assets/image/logo.png')} style={styles.logo}/>
            <Text style={styles.text}>
                AppMapBox
            </Text>
        </View>
    ) 
}

export  default Splash