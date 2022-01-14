import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { tokenMapBox } from "../../token";
import { dataJSON } from './data';
import turf from 'turf'
import iconImage from './arrow.png';

function Layers(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([])
    const [ data, setData ] = useState(dataJSON)
    const [ center, setCenter ] = useState([0.0,0.0])
    const [ featureCollection, setFeatureCollection ] = useState(turf.featureCollection(dataJSON[0]))
    const [ selectedPoint, setSelectedPoint ] = useState({})
    const [ idSelected, setidSelected ] = useState('2')
    

    useEffect(() => {   
        console.log(data)
        setCenter(turf.center(featureCollection).geometry.coordinates)
    },[])

    function actionPoint(e){
        console.log('actionPoint', e)
        if(idSelected == e.properties.id){
            Alert.alert(
                'clicked twice in the point with id: ' + e.properties.id,
                'here execute an action! ',
                [
                { text: 'OK', onPress: () => {}}
                ],
                { cancelable: false }
            );
        }else {
            setSelectedPoint(e)
            setidSelected(e.properties.id)
        }
    }

    function actions(){
        console.log('actions', data[0][0].properties.id)
        Alert.alert(
            'clicked in the button',
            'here execute an action! ',
            [
            { text: 'OK', onPress: () => {}}
            ],
            { cancelable: false }
        );
    }

    function actionMap(){
        console.log('onPress in Map')
        Alert.alert(
            'clicked in the map',
            'here execute an action! ',
            [
            { text: 'OK', onPress: () => {}}
            ],
            { cancelable: false }
        );
    }

    function actionEndMap(){
        console.log('onPress in Map')
        Alert.alert(
            'clicked in the map',
            'here execute an action! ',
            [
            { text: 'OK', onPress: () => {}}
            ],
            { cancelable: false }
        );
    }

    return(
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => console.log('TouchableWithoutFeedback')}>
            <MapboxGL.MapView
                ref={r => {map = r, setMap(map)} }
                style={styles.map}
                compassViewPosition={3}
                styleURL={MapboxGL.StyleURL.TrafficNight}
                //onPress={() => actionMap()}
                //onTouchEnd={() => actionEndMap()}
            >
                <MapboxGL.Camera
                    centerCoordinate={center}
                    zoomLevel={15}
                    followUserMode="compass"
                />
                <MapboxGL.UserLocation
                    onUpdate={(loc) => console.log(loc)}
                    minDisplacement={5}
                    renderMode="normal"
                >
                    {/*<MapboxGL.SymbolLayer
                        id="myMarker"
                        style={{
                            textField: 'V',
                            textColor: '#22f',
                            textSize: 40,
                            textRotate: 180
                            iconImage: iconImage,
                            iconSize: 0.075
                        }}
                    />*/}
                </MapboxGL.UserLocation>
                <MapboxGL.ShapeSource 
                    id='one' 
                    shape={featureCollection}
                    onPress={(e) => actionPoint(e.features[0])}
                    >
                    <MapboxGL.CircleLayer 
                        id='one.two'
                        style={{
                            circleColor: [
                                'case',['==',['get','id'], idSelected], '#00f', '#fff' 
                            ]
                        }}
                    />
                    <MapboxGL.SymbolLayer
                        id="one.three"
                        style={{
                            textField: ['get','id'],
                            textColor: '#fff',
                            textSize: 20,
                            textAnchor: 'bottom-left',
                            textOffset: [0.25,-0.25]
                        }}
                    />
                </MapboxGL.ShapeSource>
            </MapboxGL.MapView>
            </TouchableWithoutFeedback>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Testing onPress for work by layers</Text>
                <Text style={[styles.textInfo, { fontSize: 14}]}>{JSON.stringify(selectedPoint)}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={actions}>
                <Text style={styles.textButton}>Action</Text>
            </TouchableOpacity>    
        </View>
    ) 
}

export  default Layers