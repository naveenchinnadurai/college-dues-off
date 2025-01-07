import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@/context/userContext'

const HomeHeader = () => {
    const { user, logout } = useUser();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View className="flex-row items-center justify-between w-full py-2">
            <View className="flex-row items-center">
                <Image
                    source={require('../assets/images/devAssets/profile.jpg')}
                    className="w-14 h-14 rounded-full"
                />
                <View className="ml-4">
                    <Text className="text-xl font-semibold">{user?.name}</Text>
                    <Text className="text-gray-500 text-lg">{user?.type == "student" ? user?.id : user?.role}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="logout" size={30} color="black" />
            </TouchableOpacity>
            <Modal animationType='none' transparent={true} visible={modalVisible} >
                <View className='h-full w-full items-center justify-center relative'>
                    <View className='bg-black opacity-40 blur-xl absolute h-full w-full'></View>
                    <View className='bg-white space-y-3 rounded-xl w-2/3 py-5 px-4 items-center justify-center'>
                        <Text className='text-xl text-center font-medium'>Are You Sure you want to Log out ?</Text>
                        <TouchableOpacity onPress={() => { logout(); setModalVisible(false) }} className='bg-danger w-full py-2 rounded-xl'>
                            <Text className='text-lg text-white text-center font-medium'>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className=' w-full py-2 rounded-xl'>
                            <Text className='text-lg text-black text-center font-medium'>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HomeHeader