import { navigationRef } from "@/Navigation";
import { Button } from "@/Shared/Components/UI/Buttons";
import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";

export default function HomeScreen() {
    return (
        <ThemeView>
            <ThemeText>Home</ThemeText>
            <Button title="Back" onPress={() => navigationRef.goBack()} />
        </ThemeView>
    )
}