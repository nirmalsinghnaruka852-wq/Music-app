import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import { Image, View } from "react-native";

export default function Screen1() {
    return (
        <View className="w-full h-full items-center justify-center" >

            <View className="items-center w-full gap-2" >
                <ThemeText color="primary" className="text-4xl font-bold" >
                    Enjoy Your Musics
                </ThemeText>

                <ThemeText color="primary" className="text-md font-bold opacity-80" >
                    Listen to your favorite songs
                </ThemeText>
            </View>
        </View>
    )
}