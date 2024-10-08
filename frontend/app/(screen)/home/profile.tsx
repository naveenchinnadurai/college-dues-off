import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import IconDisplay from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/userContext';

export default function Profile() {
    const router = useRouter();
    const { user } = useUser()

    return (
        <SafeAreaView className="flex-1 bg-white justify-between">
            <View className="relative bg-gray-300 rounded-b-3xl overflow-hidden h-[45%]">
                <Image
                    source={require('../../../assets/images/devAssets/profile.jpg')}
                    className="absolute w-full h-full object-cover"
                />
                <View className="p-4 flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <IconDisplay name='arrow-left' size={25} />
                    </TouchableOpacity>
                </View>

                <View className="w-full absolute bottom-0 py-4 px-5 flex-row items-center justify-between">
                    <View className="">
                        <Text className="text-xl font-bold text-white">{user?.name}</Text>
                        <Text className="text-sm text-white">{user?.id}</Text>
                    </View>
                    <Text className="text-sm text-white w-1/2">Department of {user?.department}</Text>
                </View>
            </View>

            <View className="p-4 space-y-3">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-medium">No dues Accepted</Text>
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold bg-success px-2 rounded-xl text-white">3</Text>
                        <MaterialIcons name='keyboard-arrow-right' size={20} />
                    </View>
                </View>

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

            <View className="px-4 pt-6 pb-10 bg-slate-100 rounded-t-3xl space-y-4">
                <TouchableOpacity className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                        <FeatherIcons name='download' size={25} />
                        <Text className="ml-4 text-lg font-medium">Marksheet</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                        <MaterialIcons name='security' size={25} />
                        <Text className="ml-4 text-lg font-medium">Security & Privacy</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MaterialIcons name='help-outline' size={25} />
                        <Text className="ml-4 text-lg font-medium">Help & Support</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={25} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
