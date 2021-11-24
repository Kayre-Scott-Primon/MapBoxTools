import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import moment from "moment";
import turf from 'turf';
import { Icon } from "react-native-elements";

function MarkPoint(){

    MapboxGL.setAccessToken('pk.eyJ1Ijoia3Njb3R0cCIsImEiOiJja2E1ZnF5dWEwaWthM2Vxdjl4anZvMnJwIn0.cfEK3ZTP-_T8CuXi19jRQQ');

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([])
    const [ listPoints, setListPoints ] = useState([])
    const [ showMoment, setShowMoment ] = useState(false)
    const [ point, setPoint ] = useState({coordinates: [0,0], moment: ''})

    useEffect(() => {
        console.log(showMoment)
    },[showMoment])

    function addPoint(){
        let point = {
            index: listPoints.length,
            moment: moment().format('DD MM YYYY, h:mm:ss'),
            coordinates: userLocation
        }
        listPoints.push(point)
        setListPoints(listPoints)
        console.log(point)
    }

    function action(e) {
        setShowMoment(!showMoment)
        setPoint({coordinates: e.coordinates, moment: e.moment})
    }

    function renderPoints() {
        let list = []
        listPoints.forEach((e) => {
            list.push(
                <MapboxGL.MarkerView coordinate={e.coordinates} id={e.id + ''} key={e.id + '0'} title={e.moment}>
                    <TouchableOpacity onPress={() => {action(e)}} style={{padding: 50}}>
                            <Icon name='location' type='evilicon' color='#00AF2A' size={50} />
                    </TouchableOpacity>
                </MapboxGL.MarkerView>
            )
        })
        return(list)
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
                    followUserLocation={true}
                    followUserMode={'compass'}
                    centerCoordinate={userLocation}
                />
                <MapboxGL.UserLocation
                    renderMode={'normal'}
                    showsUserHeadingIndicator={true}
                    androidRenderMode={true}
                    onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
                />
                {renderPoints()}
                {showMoment ?
                    <MapboxGL.MarkerView coordinate={point.coordinates} anchor={{x: 0.5, y: 1.5}}>
                        <View style={styles.containerMoment}>
                            <Text style={styles.textMoment}>
                                {point.moment}
                            </Text>
                        </View>
                    </MapboxGL.MarkerView>
                    : false
                }
            </MapboxGL.MapView>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Mark some point</Text>
                <Text style={styles.textInfo}>User: {userLocation[0]}  {userLocation[1]}</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonMarkPoint} onPress={() => addPoint()}>
                    <Text style={styles.buttonTextMarkPoint}>Marcar ponto</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) 
}

export  default MarkPoint