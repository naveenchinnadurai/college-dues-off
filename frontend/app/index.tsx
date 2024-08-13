import { Image, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { useUser } from '../context/userContext';

const icon = require('../assets/images/icon.png')

const Index = () => {
    const { setUser } = useUser();
    return (
        <View className='flex-1 bg-white overflow-hidden items-center'>
            <View className="bg-[#407BFF] h-2/5 pb-10 flex justify-end items-center rounded-b-full w-[650px]">
                <Image source={icon} className='h-36 w-36' />
            </View>
            <Text className='text-black text-2xl font-medium mt-5 mb-3'>Choose Your role</Text>
            <View className='flex flex-col gap-5'>
                <Link href="/studentLogin" onPress={() => setUser({ userName: "", type: "Student" })} >
                    <View className='py-5 px-14 bg-gray-100 rounded-3xl gap-2 h-40'>
                        <Icon name="user-graduate" size={70} color="#000" />
                        <Text className='text-xl font-medium'>Student</Text>
                    </View>
                </Link>
                <Link href="/staffLogin" onPress={() => setUser({ userName: "", type: "Staff" })}>
                    <View className='py-5 px-14 bg-gray-100 flex flex-col justify-center items-center rounded-3xl gap-2 h-40'>
                        <Icon name="user-tie" size={70} color="#000" />
                        <Link href="/staffLogin" className='text-xl font-medium'>Staffs</Link>
                    </View>
                </Link>
            </View>
        </View>
    )
}

export default Index