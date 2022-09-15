import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { tokenMapBox } from "../../token";
import { dataGeo, dataBase } from './data'

function FeatureState(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ selectedLayer, setSelectLayer ] = useState({
            properties: { id: '' }
    })

    useEffect(() => {
        updateColors()
    },[])

    async function updateColors(){
        dataGeo.features.forEach((e, v) => {
            if(e.properties.list.length > 1){
                let counter = 0 // para contar se todas foram finisheds
                e.properties.list.forEach((i) => {
                    dataBase.features.forEach(a => {
                        if(a.slug == i){
                            switch(a.status){
                                case 'finished':
                                    console.log('finalizou')
                                    counter = counter + 1
                                    counter == e.properties.list.length 
                                        ? dataGeo.features[v].properties.color = '#0f0'
                                        : dataGeo.features[v].properties.color = '#ff0'
                                    break
                                case  'pending':
                                    console.log('pending')
                                    dataGeo.features[v].properties.color = '#fff'
                                    break
                                case 'refused':
                                    console.log('refused')
                                    dataGeo.features[v].properties.color = '#f00'
                                    break
                                case 'load':
                                    console.log('load')
                                    dataGeo.features[v].properties.color = '#ff0'
                                    break
                            }
                        }
                    })
                })
            }else {
                dataBase.features.forEach(a => {
                    if(a.slug == e.properties.list[0]){
                        switch(a.status){
                            case 'finished':
                                console.log('finalizou')
                                dataGeo.features[v].properties.color = '#0f0'
                                break
                            case  'pending':
                                console.log('pending')
                                dataGeo.features[v].properties.color = '#fff'
                                break
                            case 'refused':
                                console.log('refused')
                                dataGeo.features[v].properties.color = '#f00'
                                break
                            case 'load':
                                console.log('load')
                                dataGeo.features[v].properties.color = '#ff0'
                                break
                        }
                    }
                })
            }
        })
    }

    async function addState(e){
        console.log(e)
        dataGeo.features.some((value, index) => {
            if (value.properties.id == e.features[0].properties.id) {
              setSelectLayer(e.features[0])
              //dataGeo.features[index].properties.color = '#00f'
              return true;
            } else {
              return false;
            }
        })
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

    function renderFeaturesWithShape(){
        return(
            <MapboxGL.ShapeSource 
                shape={dataGeo}
                id='testShape'
                onPress={(e) => addState(e)}
                >
                <MapboxGL.CircleLayer
                    id='Circle'
                    style={{
                        circleRadius: 6,
                        circleColor:  [
                            'case',
                            ['==', ['get', 'id'], selectedLayer.properties.id],
                            '#00f',
                            ['get', 'color']
                        ], 
                    }}
                />
                <MapboxGL.SymbolLayer
                    id='Label'
                    style={{
                        textField: ['get', 'id'], 
                        textColor: '#fff',
                        textSize: 20,
                        textAnchor: 'bottom-left',
                        textOffset: [0.25, -0.25],
                        textFont: ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                      }}
                />
            </MapboxGL.ShapeSource>
        )
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

                {
                    /*renderFeatures()*/
                    renderFeaturesWithShape()
                }
                
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