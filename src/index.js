import React from "react"; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// pages
import Home from "./screens/home";
import Track from "./screens/track";
import MarkPoint from "./screens/markPoint";
import Follow from "./screens/follow";

const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Track" component={Track} />
            <Stack.Screen name="MarkPoint" component={MarkPoint}/>
            <Stack.Screen name="Follow" component={Follow}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default App