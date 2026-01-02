import { NavigatorScreenParams } from "@react-navigation/native";
import { MainTabsParamList } from "../MainTabNavigator/types";


export type RootStackParamList = {
    welcome: undefined;
    MainTabs: NavigatorScreenParams<MainTabsParamList>
}
