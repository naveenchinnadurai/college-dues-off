import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function NotificationLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}