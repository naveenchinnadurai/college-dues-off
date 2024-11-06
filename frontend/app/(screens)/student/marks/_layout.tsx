import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function MarkLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="internalMarks" />
        </Stack>
    );
}