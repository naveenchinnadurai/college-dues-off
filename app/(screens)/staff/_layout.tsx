import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 10,
                    height: 70,
                    paddingTop: 10,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: 'bold'
                }
            }}
            initialRouteName="home"
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name='home'
                            size={23}
                            color={focused ? '#439A4C' : '#B4B2B2'}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text className={`text-sm font-bold ${focused ? 'text-[#439A4C]' : 'text-[#B4B2B2]'}`} >
                            Home
                        </Text>
                    )
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name='chart-box-outline'
                            size={23}
                            color={focused ? '#439A4C' : '#B4B2B2'}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text className={`text-sm font-bold ${focused ? 'text-[#439A4C]' : 'text-[#B4B2B2]'}`} >
                            Dashboard
                        </Text>
                    )
                }}
            />
            <Tabs.Screen
                name="notify"
                options={{
                    title: 'Notification',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='notifications'
                            size={23}
                            color={focused ? '#439A4C' : '#B4B2B2'}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text className={`text-sm font-bold ${focused ? 'text-[#439A4C]' : 'text-[#B4B2B2]'}`} >
                            Notification
                        </Text>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='user'
                            size={23}
                            color={focused ? '#439A4C' : '#B4B2B2'}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text className={`text-sm font-bold ${focused ? 'text-[#439A4C]' : 'text-[#B4B2B2]'}`} >
                            Profile
                        </Text>
                    )
                }}
            />
        </Tabs>
    );
}