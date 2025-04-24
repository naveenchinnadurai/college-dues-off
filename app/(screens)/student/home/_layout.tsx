import React from 'react';
import { Stack } from 'expo-router';

const HomeLayout = () => {

    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
            <Stack.Screen name="index" />
            <Stack.Screen name="request" />
            <Stack.Screen name="noDueRequest" />
            <Stack.Screen name="bonafideRequest" />
            <Stack.Screen name="ondutyRequest" />
        </Stack>
    );
}

export default HomeLayout;