import React from "react"; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native'

// pages
import Home from "./screens/home";
import Track from "./screens/track";
import MarkPoint from "./screens/markPoint";
import Follow from "./screens/follow";
import Save from "./screens/save";
import ShowSave from "./screens/showSave";
import SaveTime from "./screens/saveTime";
import Splash from "./screens/splash";
import Layers from "./screens/layers";
import Distance from "./screens/distance";

const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerLeft: () => (<View/>)}}/>
            <Stack.Screen name="Track" component={Track} />
            <Stack.Screen name="MarkPoint" component={MarkPoint}/>
            <Stack.Screen name="Follow" component={Follow}/>
            <Stack.Screen name="SavePoints" component={Save}/>
            <Stack.Screen name="ShowSave" component={ShowSave}/>
            <Stack.Screen name="SaveTime" component={SaveTime}/>
            <Stack.Screen name="Layers" component={Layers}/>
            <Stack.Screen name="Distance" component={Distance}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default App