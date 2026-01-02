import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigation from "../MainTabNavigator";
import { RootStackParamList } from "./types";
import { WelcomeScreen } from "@/Features/Onboarding";


const Stack = createNativeStackNavigator<RootStackParamList>();


const screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    {name: 'welcome', component: WelcomeScreen},
    {name: 'MainTabs', component: MainTabNavigation}
]


export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="welcome"
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