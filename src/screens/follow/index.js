import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import turf from 'turf'
import moment from "moment";
import { Icon } from "react-native-elements";
import { tokenMapBox } from "../../token";

function Follow(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ oldUserLocation, setOldUserLocation ] = useState([0,0])
    var [ track, setTrack ] = useState({
        type: 'FeatureCollection',
        features: []
    })
    var [ line, setLine ] = useState({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [],
        }
    })
    const [ show, setShow ] = useState(false)

    useEffect(() => {
    },[])

    useEffect(() => {
        saveRoute()
    },[userLocation])

    function saveRoute() {
        if(oldUserLocation[0] != userLocation[0] || oldUserLocation[1] != userLocation[1]){
            console.log('andou')
            track.features.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: userLocation,
                },
                properties: {
                    moment: moment().format('DD MM YYYY , h:mm:ss')
                }
            })
            setTrack(track)
            line.geometry.coordinates.push(userLocation)
            setLine(line)
            setOldUserLocation(userLocation)
        }
    }

    return(
        <View style={styles.container}>
            <MapboxGL.MapView
                ref={r => {map = r, setMap(map)} }
                style={styles.map}
                compassViewPosition={3}
                styleURL={MapboxGL.StyleURL.TrafficNight}
            >
                <MapboxGL.Camera
                    centerCoordinate={oldUserLocation}
                    zoomLevel={15}
                />
                <MapboxGL.UserLocation
                    renderMode={'normal'}
                    showsUserHeadingIndicator={true}
                    androidRenderMode={true}
                    onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
                />
                <MapboxGL.ShapeSource id={'shapeLine'} shape={line}>
                    <MapboxGL.LineLayer id={'layerLine'} style={{lineColor: '#f00', lineWidth: 3}}/>
                </MapboxGL.ShapeSource>
                
            </MapboxGL.MapView>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Save automatically route user</Text>
            </View>
            {show ?
                <ScrollView style={styles.containerShow}>
                    <Text style={styles.textShow}>
                        {JSON.stringify(track)}
                    </Text>
                </ScrollView>
                :
                false
            }
            <TouchableOpacity style={styles.iconShow} onPress={() => setShow(!show)}>
                {!show ?
                    <Icon name='minimize' type='feather' color='#0f0' size={40} />
                    :
                    <Icon name='maximize' type='feather' color='#0f0' size={40} />
                }
            </TouchableOpacity>
        </View>
    ) 
}

export  default Follow