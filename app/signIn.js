import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth();
    // ฟังก์ชันตรวจสอบอีเมล
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleLogin = async () => {
        // ตรวจสอบว่าทุกฟิลด์ถูกกรอกครบถ้วนหรือไม่
        if (!email || !password) {
            Alert.alert('Sign In', "Please fill all the fields!")
            return;
        }

        // ตรวจสอบรูปแบบอีเมล
        if (!validateEmail(email)) {
            Alert.alert('Sign In', "Invalid email format!")
            return;
        }


        setLoading(true);

        let response = await login(email, password)

        setLoading(false);

        // console.log('====================================');
        // console.log("got result", response);

        if (!response.success) {
            Alert.alert('Sign In', response.msg)
            return;
        }
    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../assets/images/logo.png')} />
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Sign In</Text>
                        <View style={styles.inputContainer}>
                            <Entypo name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => setEmail(value)}
                                style={styles.input}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.passwordContainer}>
                            <View style={styles.inputContainer}>
                                <Entypo name="key" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => setPassword(value)}
                                    style={styles.input}
                                    placeholder='Password'
                                    secureTextEntry
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <Text style={styles.forgotPassword}>Forgot Password</Text>
                        </View>

                        <View>
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <Loading size={hp(15)} />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Don't have an account?
                            </Text>
                            <Pressable onPress={() => router.push('signUp')}>
                                <Text style={styles.footerLink}>
                                    Sign Up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    content: {
        gap: 40,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        height: hp(50),
        width: wp(50),
    },
    formContainer: {
        gap: 16,
        marginTop: -150,
    },
    title: {
        fontSize: hp(4),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        borderRadius: 16,
        height: hp(7),
    },
    input: {
        flex: 1,
        fontSize: hp(2),
        fontWeight: '600',
        color: '#333',
    },
    passwordContainer: {
        gap: 12,
    },
    forgotPassword: {
        fontSize: hp(1.8),
        fontWeight: '600',
        textAlign: 'right',
        color: '#666',
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        height: hp(7),
        backgroundColor: '#6366f1',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: hp(2.7),
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    footerText: {
        fontSize: hp(1.8),
        color: '#666',
        fontWeight: '600',
    },
    footerLink: {
        fontSize: hp(1.8),
        color: '#6366f1',
        fontWeight: '600',
    },
});
