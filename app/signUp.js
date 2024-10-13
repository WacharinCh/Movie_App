import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUP() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const { register } = useAuth()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleRegister = async () => {

        if (!email || !password || !username || !confirmpassword) {
            Alert.alert('Sign Up', "Please fill all the fields!")
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Sign Up', "Invalid email format!")
            return;
        }

        if (password !== confirmpassword) {
            Alert.alert('Sign Up', "Passwords do not match!")
            return;
        }

        setLoading(true);
        let response = await register(email, password, username)
        setLoading(false);
        if (!response.success) {
            Alert.alert('Sign Up', response.msg)
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
                        <Text style={styles.title}>Sign UP</Text>

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="user-alt" size={hp(2.5)} color="gray" />
                            <TextInput
                                onChangeText={value => setUsername(value)}
                                style={styles.input}
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Entypo name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => setEmail(value)}
                                style={styles.input}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

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

                        <View style={styles.inputContainer}>
                            <Entypo name="key" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => setConfirmPassword(value)}
                                style={styles.input}
                                placeholder='Confirm Password'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View>
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <Loading size={hp(15)} />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account?
                            </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={styles.footerLink}>
                                    Sign In
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
        gap: 48,
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
