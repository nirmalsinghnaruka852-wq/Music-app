import { navigationRef } from "@/Navigation";
import { Button } from "@/Shared/Components/UI/Buttons";
import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";

export default function WelcomeScreen() {
    return (
        <ThemeView>
            <ThemeText>Welcome Screen</ThemeText>
            <Button title="Go to Home" onPress={() => navigationRef.navigate('MainTabs', {
                screen: 'HomeStack',
                params: {screen: 'Home'}
            })} />
        </ThemeView>
    )
}