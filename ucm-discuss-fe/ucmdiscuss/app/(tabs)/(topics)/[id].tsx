import { SafeAreaProvider } from "react-native-safe-area-context";
import TopicDetailScreen from "@/screens/topicChoose";


const TopicDetail = () => {
    return (
        <SafeAreaProvider>
            <TopicDetailScreen />
        </SafeAreaProvider>
    )
}

export default TopicDetail;