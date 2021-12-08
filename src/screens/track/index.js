import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import turf from 'turf'
import { tokenMapBox } from "../../token";

function Track(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ center, setCenter ] = useState([0,0])
    const [ lineFeature, setLineFeature ] = useState({})
    var [ featureCollection, setFeatureColletion ] = useState(
        {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-120.084990,37.426929],
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-121.084990,37.426929],
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-122.084990,36.426929],
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-123.084990,35.426929],
                },
              },
            ],
          }
    )

    function line() {
        let list = []
        featureCollection.features.forEach(e => {
            list.push(e.geometry.coordinates)
        })
        setLineFeature({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: list,
            },
        })
    }

    useEffect(() => {
        line()
    },[])

    return(
        <View style={styles.container}>
            <MapboxGL.MapView
                ref={r => {map = r, setMap(map)} }
                style={styles.map}
                compassViewPosition={3}
                styleURL={MapboxGL.StyleURL.TrafficNight}
            >
                <MapboxGL.Camera
                    centerCoordinate={[-121.584280,36.426129]}
                    zoomLevel={6}
                />
                <MapboxGL.UserLocation
                    renderMode={'normal'}
                    showsUserHeadingIndicator={true}
                    androidRenderMode={true}
                    onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
                />
                <MapboxGL.ShapeSource id={'example'} shape={featureCollection}>
                    <MapboxGL.SymbolLayer id={'example2'} style={{iconImage: require('../../location.png'), iconAllowOverlap: true, iconSize: 0.025}}/>
                </MapboxGL.ShapeSource>

                <MapboxGL.ShapeSource id={'exampleLine'} shape={lineFeature}>
                    <MapboxGL.LineLayer id={'exampleLine2'} style={{lineColor: '#f00', lineWidth: 2, lineOffset: -8}}/>
                </MapboxGL.ShapeSource>
            </MapboxGL.MapView>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Line by featureCollection</Text>
            </View>
        </View>
    ) 
}

export  default Track