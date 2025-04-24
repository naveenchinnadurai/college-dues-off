import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="marksheet" />
            <Stack.Screen name="resetPassword" />
            <Stack.Screen name="faqs" />
            <Stack.Screen name="noDuesAccept" />
        </Stack>
    );
}

export default ProfileLayout; 