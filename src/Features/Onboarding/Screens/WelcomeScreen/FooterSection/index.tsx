
import { View } from "react-native";
import ActionButton from "./ActionButton";
import PageIndicator from "./PageIndicator";

export default function FooterSection() {
    return (
        <View className="flex-row items-center justify-between w-full" >
            <PageIndicator/>
            <ActionButton/> 
        </View>
    )
}