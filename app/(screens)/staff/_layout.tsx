import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';


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
                        <Image
                            source={focused
                                ? require('../../../assets/images/devAssets/activeIcons/home.png')
                                : require('../../../assets/images/devAssets/inactiveIcons/home.png')
                            }
                            className='h-6 w-6'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused
                                ? require('../../../assets/images/devAssets/activeIcons/marks.png')
                                : require('../../../assets/images/devAssets/inactiveIcons/marks.png')
                            }
                            className='h-6 w-6'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="notify"
                options={{
                    title: 'Notification',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused
                                ? require('../../../assets/images/devAssets/activeIcons/notify.png')
                                : require('../../../assets/images/devAssets/inactiveIcons/notify.png')
                            }
                            className='h-6 w-6'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused
                                ? require('../../../assets/images/devAssets/activeIcons/profile.png')
                                : require('../../../assets/images/devAssets/inactiveIcons/profile.png')
                            }
                            className='h-7 w-6'
                        />
                    ),
                }}
            />
        </Tabs>
    );
}