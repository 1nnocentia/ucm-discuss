import CreateThreadScreen from "@/screens/createThreadScreen";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const createNewThread = () => {
    return (
        <SafeAreaProvider>
            <CreateThreadScreen />
        </SafeAreaProvider>
    )
}

export default createNewThread;