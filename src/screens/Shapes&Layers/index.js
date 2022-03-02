import React, {useEffect, useState} from 'react'
import { 
    View, 
    Text 
} from 'react-native'
import turf from 'turf'
import styles from './style'
import { tokenMapBox } from "../../token";
import { dataFeatureCollection, dataFeatureCollectionPoints } from './data'
import MapboxGL from '@react-native-mapbox-gl/maps';

export default function ShapeLayer() {

    var [ map, setMap ] = useState()

    MapboxGL.setAccessToken(tokenMapBox);

    useEffect(() => {
        console.log(turf.bbox(dataFeatureCollection))
    },[])

    const pressGeometry = (e) => {
        console.log('press any geometry:', JSON.stringify(e))
    }

    return (
        <View style={styles.container}>
            <MapboxGL.MapView
                ref={r => {map = r, setMap(map)} }
                style={styles.map}
                compassViewPosition={3}
                styleURL={MapboxGL.StyleURL.TrafficNight}
            >
                <MapboxGL.Camera
                    zoomLevel={6}
                    bounds={{
                        ne: [turf.bbox(dataFeatureCollection)[0],turf.bbox(dataFeatureCollection)[1]],
                        sw: [turf.bbox(dataFeatureCollection)[2],turf.bbox(dataFeatureCollection)[3]],
                    }}
                />
                <MapboxGL.ShapeSource 
                    shape={dataFeatureCollection} 
                    id='Geometries'
                    onPress={(e) => pressGeometry(e)}
                    >
                    {/* outside yellow point */}
                    <MapboxGL.CircleLayer
                        id='pointsBorder'
                        style={{
                            circleColor: 'yellow',
                            circleRadius: 6
                        }}
                        filter={['==', '$type', 'Point']}
                    />
                    {/* inside red point */}
                    <MapboxGL.CircleLayer
                        id='points'
                        style={{
                            circleColor: 'red',
                            circleRadius: 5
                        }}
                        filter={['==', '$type', 'Point']}
                    />
                    {/* green Line */}
                    <MapboxGL.LineLayer
                        id='line'
                        style={{
                            lineColor: 'green',
                            lineWidth: 2
                        }}
                        filter={['==', '$type', 'Polygon']}
                    />
                    {/* orange fill inside line green */}
                    <MapboxGL.FillLayer
                        id='fill'
                        style={{
                            fillColor: 'orange',
                            fillOpacity: 0.1
                        }}
                        filter={['==', '$type', 'Polygon']}
                    />
                    {/* white label id  */}
                    <MapboxGL.SymbolLayer
                        id="id"
                        style={{
                            textField: ['get','id'],
                            textColor: '#fff',
                            textSize: 20,
                            textAnchor: 'bottom-left',
                            textOffset: [0.25,-0.25]
                        }}
                        filter={['==', '$type', 'Point']}
                    />
                </MapboxGL.ShapeSource>
            </MapboxGL.MapView>
            <Text style={styles.title}>Shape & Layer {'\n'}Using a featureCollections with differents geometries</Text>
        </View>
    )
}