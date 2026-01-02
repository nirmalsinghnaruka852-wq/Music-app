import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootStackNavigator";
import { RootStackParamList } from "./RootStackNavigator/types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <RootNavigator/>
        </NavigationContainer>
    )
}