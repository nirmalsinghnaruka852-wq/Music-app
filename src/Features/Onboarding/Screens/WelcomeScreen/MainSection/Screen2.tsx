import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import { View } from "react-native";

export default function Screen2() {
    return (
        <View className="w-full h-full items-center justify-center" >
            <View className="items-center w-full gap-2" >
                <ThemeText textColor="white" className="text-4xl font-bold" >
                    No Advertisements
                </ThemeText>

                <ThemeText textColor="white" className="text-md font-bold opacity-80" >
                    Listen to favorite songs without any advertisements
                </ThemeText>
            </View>
        </View>
    )
}