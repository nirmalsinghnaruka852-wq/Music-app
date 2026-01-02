import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { HomeStackParamList } from "./types";
import { HomeScreen } from "@/Features/Home";


const Stack = createNativeStackNavigator<HomeStackParamList>();


const screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    {name: 'Home', component: HomeScreen},
]


export default function HomeStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home" 
            screenOptions={{
                headerShown: false
            }}
        >
            {
                screens.map((screen, index) => (
                    <Stack.Screen key={index} {...screen}/>
                ))
            }
        </Stack.Navigator>
    )
}