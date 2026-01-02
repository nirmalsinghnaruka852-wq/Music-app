import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabsParamList } from "./types";
import HomeStackNavigator from "../HomeStackNavigator";


const Tab = createBottomTabNavigator<MainTabsParamList>();

const screens: Array<Parameters<typeof Tab.Screen>[0]> = [
    {name: 'HomeStack', component: HomeStackNavigator}
]

export default function MainTabNavigation() {
    return (
        <Tab.Navigator initialRouteName="HomeStack" 
            screenOptions={{
                headerShown: false
            }}
        >
            {
                screens.map((screen, index) => (
                    <Tab.Screen key={index} {...screen}/>
                ))
            }
        </Tab.Navigator>
    )
}
