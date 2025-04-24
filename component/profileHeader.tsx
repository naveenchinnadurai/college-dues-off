import { View, Text, Image, TouchableOpacity, Modal, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@/context/userContext'
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
    const { user, logout } = useUser();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View className="flex-row items-center justify-between w-full px-2 py-3 bg-white shadow-slate-600 shadow-xl rounded-2xl">
            <View className="flex-row items-center">
                <Image
                    source={require('../assets/images/devAssets/profile.jpg')}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-4">
                    <Text className="text-xl font-semibold">{user?.name}</Text>
                    <Text className="text-gray-500 text-lg">{user?.type == "student" ? user?.id : user?.role}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="logout" size={30} color="red" />
            </TouchableOpacity>
            <Modal animationType='none' transparent={true} visible={modalVisible}>
                <View className='h-full w-full items-center justify-center relative'>
                    <SafeAreaView className='bg-gray-800 opacity-40 blur-xl absolute h-full w-full'></SafeAreaView>
                    <View className='bg-white gap-3 rounded-xl w-2/3 p-5 items-center justify-center'>
                        <Text className='text-xl text-center font-medium'>Are You Sure you want to Log out ?</Text>
                        <TouchableOpacity onPress={() => { logout(); setModalVisible(false) }} className='bg-danger w-full py-2 rounded-xl'>
                            <Text className='text-lg text-white text-center font-medium'>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className=' w-full py-2 rounded-xl'>
                            <Text className='text-lg text-black text-center font-medium'>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar className='bg-gray-400' />
            </Modal>
        </View>
    )
}

export default Header;