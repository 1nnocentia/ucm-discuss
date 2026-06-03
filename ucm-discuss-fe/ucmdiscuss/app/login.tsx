import LoginScreen from '@/screens/loginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { StyleSheet } from 'react-native';

export const SignInWithGoogle = () => {
    return (
        <SafeAreaView>
            <LoginScreen />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})