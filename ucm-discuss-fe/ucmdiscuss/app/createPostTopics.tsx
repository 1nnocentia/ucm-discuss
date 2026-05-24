import CreateThreadScreen from "@/screens/createThreadScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const createNewThread = () => {
    return (
        <SafeAreaProvider>
            <CreateThreadScreen />
        </SafeAreaProvider>
    )
}

export default createNewThread;