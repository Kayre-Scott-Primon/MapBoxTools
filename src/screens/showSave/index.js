import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import turf from 'turf'
import moment from "moment";
import { Icon } from "react-native-elements";
import Realm from "realm";


function ShowSave(){

    MapboxGL.setAccessToken('pk.eyJ1Ijoia3Njb3R0cCIsImEiOiJja2E1ZnF5dWEwaWthM2Vxdjl4anZvMnJwIn0.cfEK3ZTP-_T8CuXi19jRQQ');

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

    // schema realm
    const schema = {
        name: "route",
        properties: {
            route: 'string',
            listCoordinates: 'string'
        }
    };

    useEffect(() => {
    },[])

    useEffect(() => {
        saveRoute()
    },[userLocation])

    /*function saveRoute() {
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
            track.features.length > 20 
            ?   save() 
            :   ToastAndroid.show(
                    `Features acumulation: ${track.features.length}`,
                ToastAndroid.SHORT,
                )
        }
    }

    async function save() {
        try{
            const realm = await Realm.open({
                path: "route",
                schema: [schema],
            });
            const route = await realm.objects("route");
            if(route.length > 0){

                // atualizando campo route
                let features = JSON.parse(route[0].route).features                
                track.features.forEach(e => {
                    features.push(e)
                })
                let update = {
                    type: 'FeatureCollection',
                    features: features
                }

                // atualizando campo listCoordinates
                let lines = JSON.parse(route[0].listCoordinates).geometry.coordinates
                line.geometry.coordinates.forEach(e => {
                    lines.push(e)
                })
                let lineUpdate = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: lines,
                    }
                }

                // atualizando realm
                realm.write(() => {
                    route[0].route = JSON.stringify(update),
                    route[0].listCoordinates = JSON.stringify(lineUpdate)
                })

                // zerando dados locais
                setTrack({
                    type: 'FeatureCollection',
                    features: []
                })
                setLine({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [],
                    }
                })
            }else{
                realm.write(() => {
                    realm.create("route", {
                        route: JSON.stringify(track),
                        listCoordinates: JSON.stringify(line)
                    });
                });
            }
            console.log('Salvo com sucesso')
            ToastAndroid.show(
                `Success save and clean local features`,
            ToastAndroid.LONG,
        )
        }catch(e){
            console.log(e)
        }
    }*/

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
                <Text style={styles.textInfo}>Save automatically route user, save realm every 20 points and clean local features</Text>
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

export  default ShowSave