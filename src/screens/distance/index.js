import React, { useEffect, useState } from "react";
import styles from './style'
import {
    View,
    Text,
} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { tokenMapBox } from "../../token";
import { dataJSON, dataFeatureEx } from './data';
import turf from 'turf'

const Line = ({line}) => (
    <MapboxGL.ShapeSource 
        id={Math.random() + ''} 
        shape={line}
        >
        {console.log('render again')}
        <MapboxGL.LineLayer 
            id={Math.random() + ''}
            style={{
                lineColor: '#f00',
                lineWidth: 2,
                lineDasharray: [1, 1]
            }}
        />
    </MapboxGL.ShapeSource>
)

function Distance(){

    MapboxGL.setAccessToken(tokenMapBox);

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ data, setData ] = useState(dataJSON)
    const [ center, setCenter ] = useState([0.0,0.0])
    const [ featureCollection, setFeatureCollection ] = useState(turf.featureCollection(dataJSON[0]))
    const [ selectedPoint, setSelectedPoint ] = useState({})
    const [ idSelected, setidSelected ] = useState('0')
    const [ distance, setDistance ] = useState('')
    const [ line , setLine ] = useState({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-47.4529817,-20.5371150],
            [-47.4526601,-20.5343011],
          ],
        },
        properties: {
            distance: '0'
        }
    })
    const [ point, setPoint ] = useState([0,0])
    const [ locText, setLocText ] = useState([0,0])


    useEffect(() => {   
        console.log(data)
        setCenter(turf.center(featureCollection).geometry.coordinates)
    },[])

    useEffect(() => {   
        console.log('Line its changed', line.geometry.coordinates , ' in the line: ' + JSON.stringify(line))
    },[line])

    useEffect(() => {
        line.geometry.coordinates[0] = [Number(userLocation[0]), Number(userLocation[1])]
        setLine(line)
        distanceCalculate(point)
        setLocText( [(Number(userLocation[0]) + Number(point[0]))/2, (Number(userLocation[1]) + Number(point[1]))/2])
    },[userLocation]) 

    useEffect(() => {
        distanceCalculate(point)
        setLocText( [(Number(userLocation[0]) + Number(point[0]))/2, (Number(userLocation[1]) + Number(point[1]))/2])
    },[point]) 
        

    function distanceCalculate(loc){
        try{
            var a = turf.point(userLocation)
            var b = turf.point(loc)
            var dist = turf.distance(a, b)
            line.properties.distance = dist.toFixed(5)*1000 + ' m'
            setLine(line)
            setDistance(dist.toFixed(5)*1000)
        }catch(e){
            console.log('Error:', e)
        }
        console.log('Distance: ' + distance + ' meters')
    }

    function onPressPoint(loc){
        line.geometry.coordinates[1] = [Number(loc[0]), Number(loc[1])]
        setLine(line)
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
                    centerCoordinate={center}
                    zoomLevel={15}
                    followUserMode="compass"
                />
                <MapboxGL.UserLocation
                    onUpdate={(loc) => {setUserLocation([loc.coords.longitude.toFixed(7), loc.coords.latitude.toFixed(7)])}}
                    minDisplacement={5}
                    renderMode="normal"
                />
                <MapboxGL.ShapeSource 
                    id='one' 
                    shape={featureCollection}
                    onPress={(e) => {
                        setPoint([e.coordinates.longitude.toFixed(7), e.coordinates.latitude.toFixed(7)])
                        onPressPoint([e.coordinates.longitude.toFixed(7), e.coordinates.latitude.toFixed(7)])
                        }}
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
                <Line  line={line}/>
                <MapboxGL.PointAnnotation coordinate={locText}>
                    <Text style={{color: '#fff', fontSize: 20, backgroundColor: 'rgba(255,255,255,0.25sd)', borderRadius: 10}}>{distance}m</Text>
                </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Testing dynamic distance between user and one layer</Text>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.textInfo, { fontSize: 14 }]}>{JSON.stringify(line)}</Text>
            </View>
        </View>
    ) 
}

export  default Distance