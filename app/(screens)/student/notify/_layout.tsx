import React from 'react';
import { Stack } from 'expo-router';

const NotificationLayout = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}

export default NotificationLayout;