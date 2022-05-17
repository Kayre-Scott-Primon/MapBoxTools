import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import CompassHeading from 'react-native-compass-heading';
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, {useState, useEffect} from 'react'
import { tokenMapBox } from "../../token"
import iconImage from './arrow.png'
import { shape } from './data'
import styles from './style'
import turf from 'turf'

MapboxGL.setAccessToken(tokenMapBox);

const FollowUser = () => {

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ compassHeading, setCompassHeading ] = useState(0)
    const [ follow, setFollow ] = useState(true)
    const [ pitch, setPitch ] = useState(80)
    var [ cameraMap, setCameraMap ] = useState()
    const [ icon, setIcon ] = useState('text')
    const [ zoom, setZoom ] = useState(14)
    const [ head, setHead ] = useState(0)
    const [ bounds, setBounds ] = useState({
        ne: [0,0],
        sw: [0,0],
        padding: 2
    })

    async function changeMode() {
        console.log('zoom', await map.getZoom())
        setZoom(await map.getZoom())
        setFollow(!follow)
        //setPitch(80)
        if(follow){
            setPitch(80)
            setHead(0)
            setTimeout(() => centerLayer(),2000)
        }else{
            setBounds(undefined)
            setPitch(0)
        }
    }

    function centerLayer(){
        console.log('centerLayer')
        let edges = turf.bbox(shape)
        setBounds({
            ne: [edges[0],edges[1]],
            sw: [edges[2],edges[3]],
            padding: 2
        })
        //cameraMap
        //cameraMap.fitBounds(bounds.ne, bounds.sw, 5, 1000)
    }

    function changeIcon(){
        icon == 'text' ? setIcon('icon') : setIcon('text')
        setFollow(follow)
    }

    useEffect(() => {
        const degree_update_rate = 3
        CompassHeading.start(degree_update_rate, ({ heading, accuracy}) => {
            setCompassHeading(heading)
        })
    
        return () => {
            CompassHeading.stop()
        }
    }, []);

    useEffect(() => {
        console.log('follow:', follow, 'bounds:', bounds)
    },[follow])

  return (
    <View style={styles.containerMain}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
        <MapboxGL.MapView
            ref={r => {map = r, setMap(map)} }
            style={styles.containerMap}
            compassViewPosition={3}
            styleURL={MapboxGL.StyleURL.TrafficNight}
            onTouchEnd={() => {
                if(follow){
                    setFollow(false)
                    setTimeout(() => setFollow(true),1000)
                }else{
                    setFollow(true)
                    setFollow(false)
                }
                setPitch(pitch)
                console.log('02')
            }}
            //zoomEnabled={false}
            pitchEnabled={true}
            rotateEnabled={follow}
        >
            <MapboxGL.Camera
                bounds={bounds}
                ref={m => {cameraMap = m, setCameraMap(cameraMap)}}
                followUserLocation={follow}
                followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
                followPitch={pitch}
                heading={head}
            />
            <MapboxGL.UserLocation
                renderMode={'normal'}
                showsUserHeadingIndicator={true}
                androidRenderMode={'compass'}
                onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
            >
                <MapboxGL.SymbolLayer
                    id="myMarker"
                    style={{
                        textField: icon == 'text' ? '\n\nV' : '',
                        textColor: '#ff0',
                        textSize: 40,
                        textRotate: follow ? 180 : 180 + compassHeading,
                        iconImage:  icon == 'icon' ? iconImage : '',
                        iconSize: 0.075,
                        textPitchAlignment: 'map',
                        iconPitchAlignment: 'map',                        
                    }}
                />
            </MapboxGL.UserLocation>
            {shape != {} ? 
                <>
                <MapboxGL.ShapeSource id='shape' shape={shape}>
                    <MapboxGL.LineLayer id='layer-line' style={{
                        lineColor: '#a08',
                        lineWidth: 5
                    }} />
                </MapboxGL.ShapeSource>
                </>
                : false
            }
        </MapboxGL.MapView>
        <View style={styles.containerTitle}>
            <Text style={styles.textInfo}>Follow user location</Text>
        </View>
        <View style={styles.containerButton}>
            <TouchableOpacity 
                style={[styles.button, follow 
                    ? {backgroundColor: 'rgba(225,15,50,0.5)'} 
                    : {backgroundColor: 'rgba(123,231,132,0.5)'}
                    ]} 
                onPress={() => changeMode()}>
            {follow 
                ? <Text style={styles.labelButton}>UnFollow</Text>
                : <Text style={styles.labelButton}>Follow</Text>
            }
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, icon == 'text' 
                    ? {backgroundColor: 'rgba(15,15,250,0.5)'} 
                    : {backgroundColor: 'rgba(255,255,0,0.5)'}
                    ]} 
                onPress={() => changeIcon()}>
            {icon == 'text' 
                ? <Text style={styles.labelButton}>Icon</Text>
                : <Text style={styles.labelButton}>Text</Text>
            }
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default FollowUser