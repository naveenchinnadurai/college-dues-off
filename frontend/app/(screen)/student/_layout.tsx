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
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: tabStyles,
                tabBarLabelStyle: {
                    fontSize: 13,
                    marginTop: 5,
                    marginBottom: 2,
                    fontWeight: 'bold'
                }
            }}
            initialRouteName="home"
        >
            <Tabs.Screen
                name="homeScreen"
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
                name="markScreen"
                options={{
                    title: 'Marks',
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
                name="profileScreen"
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