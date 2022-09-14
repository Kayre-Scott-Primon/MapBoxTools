import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { tokenMapBox } from "../../token";
import { dataGeo, dataBase } from './data'

function FeatureState(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])

    useEffect(() => {
        updateColors()
    },[])

    async function updateColors(){
        dataGeo.features.forEach((e, v) => {
            if(e.properties.coletas.length > 1){
                let counter = 0 // para contar se todas foram finalizadas
                e.properties.coletas.forEach((i) => {
                    dataBase.features.forEach(a => {
                        if(a.slug == i){
                            switch(a.status){
                                case 'finalizada':
                                    console.log('finalizou')
                                    counter = counter + 1
                                    console.log('here', counter, e.properties.coletas.length )
                                    counter == e.properties.coletas.length 
                                        ? dataGeo.features[v].properties.color = '#0f0'
                                        : dataGeo.features[v].properties.color = '#ff0'
                                    break
                                case  'pendente':
                                    console.log('pendente')
                                    dataGeo.features[v].properties.color = '#fff'
                                    break
                                case 'recusada':
                                    console.log('recusada')
                                    dataGeo.features[v].properties.color = '#f00'
                                    break
                                case 'andamento':
                                    console.log('andamento')
                                    dataGeo.features[v].properties.color = '#ff0'
                                    break
                            }
                        }
                    })
                })
            }else {
                dataBase.features.forEach(a => {
                    if(a.slug == e.properties.coletas[0]){
                        switch(a.status){
                            case 'finalizada':
                                console.log('finalizou')
                                dataGeo.features[v].properties.color = '#0f0'
                                break
                            case  'pendente':
                                console.log('pendente')
                                dataGeo.features[v].properties.color = '#fff'
                                break
                            case 'recusada':
                                console.log('recusada')
                                dataGeo.features[v].properties.color = '#f00'
                                break
                            case 'andamento':
                                console.log('andamento')
                                dataGeo.features[v].properties.color = '#ff0'
                                break
                        }
                    }
                })
            }
        })
    }

    async function addState(e, i){
        console.log(e)
        dataGeo.features[i].properties.color = '#00f'
    }

    function renderFeatures(){
        return (dataGeo.features.map((e, i) => (
            <TouchableWithoutFeedback onPress={() => {
                addState(e, i)
            }}
            >
                <MapboxGL.MarkerView
                    coordinate={e.geometry.coordinates}
                    title={e.properties.id}
                    >
                        <>
                            <View
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 10,
                                    backgroundColor: e.properties.color ? e.properties.color : "#fff"
                                }}
                            />
                            {/*<Text style={{
                                color: '#fff',
                                fontSize: 50,
                            }}>
                                {e.properties.id}
                            </Text>*/}
                        </>
                </MapboxGL.MarkerView>
            </TouchableWithoutFeedback>
        )))
    }

    return(
        <View style={styles.container}>
            <MapboxGL.MapView
                ref={r => {map = r, setMap(map)}}
                style={styles.map}
                compassViewPosition={3}
                styleURL={MapboxGL.StyleURL.TrafficNight}
            >
                <MapboxGL.Camera
                    centerCoordinate={[-47.479234, -20.522211]}
                    zoomLevel={14}
                    //bounds={centerCamera}
                />
                <MapboxGL.UserLocation
                    onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
                />

                {renderFeatures()}
                
            </MapboxGL.MapView>

            <View style={styles.head}>
                <Text style={styles.textInfo}>Page to test feature state mapbox inside react native</Text>
            </View>

        </View>
    ) 
}

export  default FeatureState


/*
https://docs.mapbox.com/help/tutorials/data-joins-with-mapbox-boundaries/
https://stackoverflow.com/questions/55280405/how-do-i-set-state-of-activeid-to-be-the-specific-feature-id-of-a-selected-icon
https://blog.mapbox.com/going-live-with-electoral-maps-a-guide-to-feature-state-b520e91a22d
https://blog.kevinchisholm.com/react-native/mapbox-sdk-fly-to/
https://github.com/mapbox/mapbox-gl-native/issues/12413
*/