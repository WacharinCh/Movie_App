import React, { useEffect } from 'react'
import { Slot, useSegments, useRouter } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated == "undefined") return;
        const inAuthGroup = segments[0] === '(auth)';

        if (isAuthenticated && !inAuthGroup) {
            router.replace('Home');
        } else if (isAuthenticated === false) {
            router.replace('Welcome');
        }
    }, [isAuthenticated]);

    return <Slot />
}

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}
