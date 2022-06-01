import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import CompassHeading from 'react-native-compass-heading';
import MapboxGL from '@react-native-mapbox-gl/maps'
import React, {useState, useEffect} from 'react'
import { Icon } from "react-native-elements"
import { tokenMapBox } from "../../token"
import iconImage from './arrow.png'
import { shape } from './data'
import styles from './style'
import turf from 'turf'

MapboxGL.setAccessToken(tokenMapBox);

const FollowUserManual = () => {

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ compassHeading, setCompassHeading ] = useState(0)
    const [ follow, setFollow ] = useState(true)
    const [ pitch, setPitch ] = useState(80)
    var [ cameraMap, setCameraMap ] = useState()
    const [ icon, setIcon ] = useState('text')
    const [ head, setHead ] = useState(0)
    const [ boundFactor, setBoundFactor ] = useState(0.0001)
    const [ bounds, setBounds ] = useState({
        ne: [0,0],
        sw: [0,0],
        padding: 2
    })

    async function changeMode() {
        setFollow(!follow)
        if(follow){
            setHead(0)
            setTimeout(() => centerLayer(),1000)
        }else{
            setTimeout(() => centerUser(),1000)
        }
    }

    function centerLayer(){
        setPitch(0)
        let edges = turf.bbox(shape)
        setBounds({
            ne: [edges[0],edges[1]],
            sw: [edges[2],edges[3]],
            paddingTop: 50,
            paddingBottom: 100,
            paddingLeft: 50,
            paddingRight: 50
        })
    }

    function centerUser(){
        setPitch(100)
        setBounds({
            ne: [userLocation[0] - boundFactor, userLocation[1] - boundFactor],
            sw: [userLocation[0] + boundFactor, userLocation[1] + boundFactor],
            paddingTop: 400,
            paddingBottom: 100,
            paddingLeft: 50,
            paddingRight: 50
        })
    }

    function changeIcon(){
        icon == 'text' ? setIcon('icon') : setIcon('text')
        setFollow(follow)
    }

    function changeZoom(operator){
        if(operator == '+'){
            setBoundFactor(boundFactor*0.5)
        }else{
            setBoundFactor(boundFactor/0.5)
        }
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
        console.log('follow:', follow, 'bounds:', bounds, 'boundFactor:', boundFactor)
    },[follow])

    useEffect(() => {
        if(follow){
            setTimeout(() => centerUser(),500)
            setHead(compassHeading)
        }
    },[userLocation])

  return (
    <View style={styles.containerMain}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
        <MapboxGL.MapView
            ref={r => {map = r, setMap(map)} }
            style={styles.containerMap}
            compassViewPosition={0}
            compassViewMargins={{x: 15, y: 75}}
            styleURL={MapboxGL.StyleURL.TrafficNight}
            onTouchEnd={() => {
                if(follow){
                    setTimeout(() => centerUser(),1000)
                }else{
                }
            }}
            pitchEnabled={true}
            rotateEnabled={false}
        >
            <MapboxGL.Camera
                bounds={bounds}
                ref={m => {cameraMap = m, setCameraMap(cameraMap)}}
                heading={head}
                pitch={pitch}
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
            <Text style={styles.textInfo}>Follow user location by manual actions/functions</Text>
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
            <View style={[styles.button, {flexDirection: 'row'}]}>
                <TouchableOpacity onPress={() => changeZoom('+')}>
                    <Icon name='plus' type='feather' color='#0f0' size={35} />
                </TouchableOpacity>
                <View style={styles.dividerButton}/>
                <TouchableOpacity onPress={() => changeZoom('-')}>
                    <Icon name='minus' type='feather' color='#0f0' size={35} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default FollowUserManual