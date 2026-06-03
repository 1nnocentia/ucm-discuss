import LoginScreen from '@/screens/loginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { StyleSheet } from 'react-native';

const SignInWithGoogle = () => {
    return (
        <SafeAreaView>
            <LoginScreen />
        </SafeAreaView>
    )
}
export default SignInWithGoogle;

const styles = StyleSheet.create({

})