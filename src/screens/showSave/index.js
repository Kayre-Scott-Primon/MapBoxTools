import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    Share,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import turf, { center } from 'turf'
import moment from "moment";
import { Icon } from "react-native-elements";
import Realm from "realm";
const tokml = require('tokml')



function ShowSave(){

    MapboxGL.setAccessToken('pk.eyJ1Ijoia3Njb3R0cCIsImEiOiJja2E1ZnF5dWEwaWthM2Vxdjl4anZvMnJwIn0.cfEK3ZTP-_T8CuXi19jRQQ');

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
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
    const [ centerCamera, setCenterCamera ] = useState({
        ne: [0.0,0.0],
        sw: [0.0,0.0]
    })
    const [ empty, setempty ] = useState(false)
    const [ share, setShare ] = useState(false)

    // schema realm
    const schema = {
        name: "route",
        properties: {
            route: 'string',
            listCoordinates: 'string'
        }
    };

    useEffect(() => {
        readRealm()
    },[])

    async function readRealm() {
        try{
            const realm = await Realm.open({
                path: "route",
                schema: [schema],
            });
            const route = await realm.objects("route");
            if(route.length > 0){
                setTrack(JSON.parse(route[0].route))
                setLine(JSON.parse(route[0].listCoordinates))
                var aux = turf.envelope(JSON.parse(route[0].listCoordinates))
                var aux1 = turf.bbox(aux)
                setCenterCamera({
                    ne: [aux1[0], aux1[1]],
                    sw: [aux1[2], aux1[3]],
                    paddingLeft: 50,
                    paddingRight: 50,
                    paddingBottom: 50,
                    paddingTop: 50
                })
            }else{
                setempty(true)
            }
        }catch(e){
            console.log(e)
        }
    }

    async function exportKML() {
        var kml = tokml(track);
        try {
            const result = await Share.share({
                message:
                    'Exporting your route data by format .KML',
                url: 'diretorio do caminho do arquivo'
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
        } catch (error) {
        alert(error.message);
        }
    }

    function buttonShare() {
        setShare(false)
        exportKML()
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
                    //centerCoordinate={centerCamera}
                    bounds={centerCamera}
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
                <Text style={styles.textInfo}>Read realm datas and show route that was automatically save with the page Save Following</Text>
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
            {share ?
                <View style={styles.containerShow}>
                    <Text style={[styles.textShare, {alignSelf: 'center'}]}>
                        Do you really want to export .kml ?
                    </Text>
                    <TouchableOpacity style={styles.buttonShowShare} onPress={buttonShare}>
                        <Text style={styles.textShowShare}>
                            Yes, i want!
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                false
            }
            <View style={styles.conteinerButtons}>
                <TouchableOpacity style={styles.iconShow} onPress={() => setShow(!show)}>
                    {!show ?
                        <Icon name='minimize' type='feather' color='#0f0' size={40} />
                        :
                        <Icon name='maximize' type='feather' color='#0f0' size={40} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconShow} onPress={() => setShare(!share)}>
                        <Icon name='share' type='feather' color='#0f0' size={40} />
                </TouchableOpacity>
            </View>
            { empty ?
                <View style={styles.foot}>
                    <Text style={styles.textInfo}>make tracking in the page save Following</Text>
                </View>
                : false
            }
        </View>
    ) 
}

export  default ShowSave