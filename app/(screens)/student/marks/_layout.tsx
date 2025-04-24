import React from 'react';
import { Stack } from 'expo-router';

const MarkLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="internalMarks" />
        </Stack>
    );
}


export default MarkLayout;