import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';


export default function AppLayout() {
    const tabStyles = {
        paddingBottom: 10,
        height: 70,
        paddingTop: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
    return (
        <Tabs screenOptions={{ tabBarStyle: tabStyles, tabBarLabelStyle: { fontSize: 13, marginTop: 5, marginBottom: 2 } }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image source={require('../../../assets/images/devAssets/activeIcons/home.png')} className='h-7 w-7' />
                    ),
                }}
            />
            <Tabs.Screen
                name="marks"
                options={{
                    title: 'Marks',
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image source={require('../../../assets/images/devAssets/inactiveIcons/marks.png')} className='h-7 w-7' />
                    ),
                }}
            />
            <Tabs.Screen
                name="notify"
                options={{
                    title: 'Notification',
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image source={require('../../../assets/images/devAssets/inactiveIcons/notify.png')} className='h-6 w-6' />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image source={require('../../../assets/images/devAssets/inactiveIcons/profile.png')} className='h-6 w-6' />
                    ),
                }}
            />
            <Tabs.Screen
                name="internalMarks"
                options={{
                    headerShown: false,
                    tabBarButton:()=>null
                }}
            />
            <Tabs.Screen
                name="request"
                options={{
                    headerShown: false,
                    tabBarButton:()=>null
                }}
            />
        </Tabs>
    );
}