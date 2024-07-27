import { Image, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { useUser } from '../context/userContext';

const icon = require('../assets/images/icon.png')

const Index = () => {
    const { setUser } = useUser()
    return (
        <View className='flex-1 bg-white overflow-hidden items-center'>
            <View className="bg-[#407BFF] h-2/5 pb-10 flex justify-end items-center rounded-b-full w-[650px]">
                <Image source={icon} className='h-36 w-36' />
            </View>
            <Text className='text-black text-2xl font-medium mt-5 mb-3'>Choose Your role</Text>
            <View className='flex flex-col gap-4'>
                <Link href="/studentLogin" onPress={() => setUser({ userName: "", type: "Student" })} className='py-5 px-10 bg-gray-100 flex- flex-col justify-center items-center rounded-3xl gap-2'>
                    <Icon name="user-graduate" size={70} color="#000" />
                    <Text className='text-xl font-medium'>Student</Text>
                </Link>
                <View className='py-5 px-10 bg-gray-100 flex- flex-col justify-center items-center rounded-3xl gap-2'>
                    <Icon name="user-tie" size={70} color="#000" />
                    <Link href="/staffLogin" onPress={() => setUser({ userName: "", type: "Staff" })} className='text-xl font-medium'>Staffs</Link>
                </View>
            </View>
        </View>
    )
}

export default Index