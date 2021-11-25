import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    BackHandler
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import moment from "moment";
import { Icon } from "react-native-elements";
import Realm from "realm";

function SaveTime({navigation}){

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
    var interval

    // schema realm
    const schema = {
        name: "route",
        properties: {
            route: 'string',
            listCoordinates: 'string'
        }
    };

    useEffect(() => {
        cleanRealm()
    },[])

    useEffect(() => {
        interval = setInterval(() => {
            save()
        }, 12000)
    },[])

    useEffect(() => {
        saveRoute()
    },[userLocation])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            backButtonClick()
            return true
        }) 
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", () => {});
   },[])

   function backButtonClick() {
        clearImmediate(interval)
        navigation.goBack()
   }

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
            realm.close()
        }catch(e){
            console.log(e)
        }
    }

    async function cleanRealm(){
        const realm = await Realm.open({
            path: "route",
            schema: [schema],
        });
        realm.write(() => {
            realm.deleteAll()
        })
        ToastAndroid.show(
            `Success delete all data Realm `,
        ToastAndroid.LONG,
        )
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
                <Text style={styles.textInfo}>Save automatically route user, save realm every 2 minutes and clean local features</Text>
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
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.iconShow} onPress={() => setShow(!show)}>
                    {!show ?
                        <Icon name='minimize' type='feather' color='#0f0' size={40} />
                        :
                        <Icon name='maximize' type='feather' color='#0f0' size={40} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomDelete} onPress={() => {cleanRealm()}}>
                    <Icon name='trash' type='feather' color='#0f0' size={40} />
                </TouchableOpacity>
            </View>
        </View>
    ) 
}

export  default SaveTime