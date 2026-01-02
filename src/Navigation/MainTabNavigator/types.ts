import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeStackParamList } from "../HomeStackNavigator/types";

export type MainTabsParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
}