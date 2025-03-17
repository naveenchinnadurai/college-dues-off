import { useUser } from '@/context/userContext';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IconDisplay from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
    const { user, router } = useUser()

    return (
        <SafeAreaView className="flex-1 bg-white justify-between">
            <View className="relative bg-gray-800 rounded-b-3xl overflow-hidden h-[45%]">
                <Image
                    source={require('../../../../assets/images/devAssets/profile.jpg')}
                    className="absolute w-full h-full object-cover opacity-40"
                />
                <View className="p-4 flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <IconDisplay name='arrow-left' size={25} />
                    </TouchableOpacity>
                </View>

                <View className="w-full absolute bottom-0 py-4 px-5 flex-col gap-1.5 justify-between">
                    <View className='flex-col gap-1'>
                        <Text className="text-2xl font-bold text-white">{user?.name}</Text>
                        <Text className="text-sm text-white">({user?.id})</Text>
                    </View>
                    <Text className="text-lg text-white font-medium">Department of {user?.department}</Text>
                </View>
            </View>

            <View className="p-4 gap-3">
                <TouchableOpacity onPress={() => router.push('/(screens)/student/profile/noDuesAccept')} className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-medium">No dues Accepted</Text>
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold bg-success px-2 rounded-xl text-white">3</Text>
                        <MaterialIcons name='keyboard-arrow-right' size={20} />
                    </View>
                </TouchableOpacity>

                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-medium">No dues Rejected</Text>
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold bg-danger px-2 rounded-xl text-white">2</Text>
                        <MaterialIcons name='keyboard-arrow-right' size={20} />
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-medium">No dues Revoke</Text>
                    <MaterialIcons name='keyboard-arrow-right' size={20} />
                </View>
            </View>

            <View className="px-4 pt-4 pb-10 bg-slate-100 rounded-t-3xl gap-2">
                <TouchableOpacity className="flex-row justify-between items-center mb-4" onPress={() => router.push('/student/profile/marksheet')}>
                    <View className="flex-row items-center">
                        <FeatherIcons name='download' size={25} />
                        <View className='flex-col row-span-1'>
                            <Text className="ml-4 text-lg font-medium">Marksheet</Text>
                            <Text className="ml-4 text-sm font-normal">Download Your Marksheet</Text>
                        </View>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center mb-4" onPress={() => router.push('/student/profile/resetPassword')}>
                    <View className="flex-row items-center">
                        <MaterialIcons name='security' size={25} />
                        <View className='flex-col row-span-1'>
                            <Text className="ml-4 text-lg font-medium">Security & Privacy</Text>
                            <Text className="ml-4 text-sm font-normal">Change Your password</Text>
                        </View>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center" onPress={() => router.push('/student/profile/faqs')}>
                    <View className="flex-row items-center">
                        <MaterialIcons name='help-outline' size={25} />
                        <View className='flex-col row-span-1'>
                            <Text className="ml-4 text-lg font-medium">Help & Support</Text>
                            <Text className="ml-4 text-sm font-normal">For any Questions , Contact us</Text>
                        </View>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
