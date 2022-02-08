import React, { 
    useEffect, 
    useState,
    useRef,
} from 'react';
import { 
    View, 
    Text,
    AppState,
    Platform,
    ToastAndroid,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';
import styles from './style';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

export default function Background() {

    const [ background, setBackground ] = useState(false)
    const [ coords, setCoords ] = useState([0,0])
    const appState = useRef(AppState.currentState);
    const [ appStateVisible, setAppStateVisible ] = useState(appState.current);
    const [ coordsList, setCoordsList ] = useState([])

    useEffect(() => {
        popUpPermission() 
        addTask()
        if (ReactNativeForegroundService.is_running()) {
            setBackground(true)
        }
        const subscription = AppState.addEventListener("change", nextAppState => {
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });
      
        AppState.addEventListener('change', 
        (stateFunction));

        return () => {
            subscription.remove();
            console.log('Exit App / componentWillUnmount()')
            stopForegroundService()
            ToastAndroid.showWithGravity(
                "All tasks have been stopped",
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
    },[])

    function stateFunction(nextAppState){
        console.log('nextAppState', nextAppState)
    }

    function PermissionLocation() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                title: 'Permission ACCESS_COARSE_LOCATION',
                message: 'Agree this app access your coarse location',
                buttonPositive: 'Agree',
                buttonNegative: 'Disagree',
                buttonNeutral: 'Cancel'
            }
        ).then(coarse => {
            if (coarse === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('granted permission ACCESS_COARSE_LOCATION')
            } else {
                console.log('negaded permission ACCESS_COARSE_LOCATION')
                alert('Disagree permission');
            }
        }).finally(() => {
            PermissionFineLocation() 
        })
    }

    function PermissionFineLocation() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Permission ACCESS_FINE_LOCATION',
                message: 'Agree this app access your fine location',
                buttonPositive: 'Agree',
                buttonNegative: 'Disagree',
                buttonNeutral: 'Cancel'
            }
        ).then(fine => {
            if (fine === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('granted permission ACCESS_FINE_LOCATION')
            } else {
                console.log('negaded permission ACCESS_FINE_LOCATION')
                alert('Disagree permission');
            }
        }).finally(() => {
            PermissionBackgroundLocation()    
        })
    }

    function PermissionBackgroundLocation(){
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
                title: 'Permission ACCESS_BACKGROUND_LOCATION',
                message: 'Agree this app access your background location',
                buttonPositive: 'Agree',
                buttonNegative: 'Disagree',
                buttonNeutral: 'Cancel'
            }
        ).then(background => {
            console.log('Backgrounded', background)
            if (background === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('granted permission ACCESS_BACKGROUND_LOCATION')
            } else {
                console.log('negaded permission ACCESS_BACKGROUND_LOCATION')
                alert('Disagree permission');
            }
        }).finally(() => {
            checkGPSstatus()
        })
    }

    // GPS turn on
    async function checkGPSstatus() {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
        .then((data) => {
            // The user has accepted to enable the location services
            // data can be :
            //  - "already-enabled" if the location services has been already enabled
            //  - "enabled" if user has clicked on OK button in the popup
            console.log('GPS turned on')
        })
        .catch((err) => {
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
            // codes :
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
            //  - ERR03 : Internal error
            console.log('GPS turned off')
        });
    }
 
    async function popUpPermission() {
        if(Number(String(Platform.constants.Release).split('.')[0]) <= 9){
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(async (response) => {
                if(!response){
                    PermissionLocation()
                }else{console.log('Version android above 9, OK')}
            })
        }else{
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION).then(async (response) => {
                if(!response){
                    PermissionLocation()
                }else{console.log('Version android below 9, OK')}
            })
        }
    }

    function addTask(){
        RNLocation.configure({
            distanceFilter: 100, // Meters
            desiredAccuracy: {
              ios: 'best',
              android: 'highAccuracy',
            },
            // Android only
            androidProvider: 'auto',
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: 'other',
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: 'portrait',
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        });
        let locationSubscription = null;
        let locationTimeout = null;
        
        ReactNativeForegroundService.add_task(
            () => {
                RNLocation.requestPermission({
                ios: 'whenInUse',
                android: {
                    detail: 'fine',
                },
                }).then((granted) => {
                // if has permissions try to obtain location with RN location
                    if (granted) {
                        locationSubscription && locationSubscription();
                        locationSubscription = RNLocation.subscribeToLocationUpdates(
                            ([locations]) => {
                                locationSubscription();
                                locationTimeout && clearTimeout(locationTimeout);
                                loopFunctionBackground([locations.longitude, locations.latitude])
                                console.log([locations.longitude, locations.latitude]);
                            },
                        );
                    } else {
                        locationSubscription && locationSubscription();
                        locationTimeout && clearTimeout(locationTimeout);
                        console.log('no permissions to obtain location');
                    }
                });
            },
            {
                delay: 1000,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log('Error logging:', e),
            },
        );
    }

    function startForegroundService(){
        ReactNativeForegroundService.start({
            id: 144,
            title: 'Foreground Service',
            message: 'you are online!',
        });
        setBackground(true)
    }

    function stopForegroundService() {
        setBackground(false)
        ReactNativeForegroundService.remove_all_tasks()
        return ReactNativeForegroundService.stop()
    }

    function loopFunctionBackground(coords) {
        try{
            setCoords(coords)
            coordsList.push(coords)
            setCoordsList(coordsList)
        }catch(e){
            console.log('entrou no catch')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.textInfo}>Capture locations when app is in background or when app is closed</Text>
            </View>
        <TouchableOpacity 
            style={[styles.button, background ? {backgroundColor: 'red'} : {backgroundColor: 'green'}]} 
            onPress={() => {!background ? startForegroundService() : stopForegroundService()}}>
            { !background
                ? <Text style={styles.textButton}>start background location</Text>
                : <Text style={styles.textButton}>stop background location</Text>
            }
        </TouchableOpacity>
        <Text style={styles.coords}>{coords[0]}   {coords[1]}</Text>
        <Text style={styles.coordsList}>{coordsList}</Text>
        </View>
    );
}
