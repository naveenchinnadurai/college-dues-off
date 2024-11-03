import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function MarkLayout() {

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