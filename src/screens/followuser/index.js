import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './style'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { tokenMapBox } from "../../token";
import iconImage from './arrow.png';

MapboxGL.setAccessToken(tokenMapBox);

const FollowUser = () => {

    var [ map, setMap ] = useState()
    const [ userLocation, setUserLocation ] = useState([0,0])
    const [ follow, setFollow ] = useState(true)
    const [ pitch, setPitch ] = useState(60)
    const [ icon, setIcon ] = useState('text')

    function changeMode() {
        setFollow(!follow)
        follow ? setPitch(80) : setPitch(0)
    }

    function changeIcon(){
        icon == 'text' ? setIcon('icon') : setIcon('text')
        setFollow(follow)
    }

  return (
    <View style={styles.containerMain}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
        <MapboxGL.MapView
            ref={r => {map = r, setMap(map)} }
            style={styles.containerMap}
            compassViewPosition={3}
            styleURL={MapboxGL.StyleURL.TrafficNight}
            onDidFinishRenderingMapFully={(r) => {
                setFollow(follow)
                setPitch(pitch)
            }}
            zoomEnabled={true}
        >
            <MapboxGL.Camera
                followUserLocation={follow}
                followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
                followPitch={pitch}
            />
            <MapboxGL.UserLocation
                renderMode={'normal'}
                showsUserHeadingIndicator={false}
                androidRenderMode={'compass'}
                onUpdate={location => setUserLocation([location.coords.longitude, location.coords.latitude])}
            >
                <MapboxGL.SymbolLayer
                    id="myMarker"
                    style={{
                        textField: icon == 'text' ? '\n\nV' : '',
                        textColor: '#ff0',
                        textSize: 40,
                        textRotate: 180,
                        iconImage:  icon == 'icon' ? iconImage : '',
                        iconSize: 0.075,
                        textPitchAlignment: 'map',
                        iconPitchAlignment: 'map',
                        
                    }}
                />
            </MapboxGL.UserLocation>
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
                    ? {backgroundColor: 'rgba(25,15,250,0.5)'} 
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