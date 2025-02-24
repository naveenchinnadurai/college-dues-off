import { useUser } from '@/context/userContext';
import { Image, LogBox, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import '../global.css'
const icon = require('../assets/images/icon.png');
const Index = () => {
    LogBox.ignoreAllLogs(); // removing warning popup in preview.
    const { router } = useUser();
    return (
        <View className='flex-1 bg-white overflow-hidden items-center'>
            <View className="bg-[#407BFF] h-2/5 pb-10 flex justify-end items-center rounded-b-full w-[650px]">
                <Image source={icon} className='h-36 w-36' />
            </View>
            <Text className='text-black text-2xl font-medium mt-5 mb-3'>Choose Your role</Text>
            <View className='flex flex-col gap-5'>
                <TouchableOpacity onPress={() => router.push('/(auth)/studentLogin')} className='py-5 px-14 bg-gray-100 rounded-3xl gap-2 h-40'>
                    <Icon name="user-graduate" size={70} color="#000" />
                    <Text className='text-xl font-medium'>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(auth)/staffLogin')} className='py-5 px-14 bg-gray-100 flex flex-col justify-center items-center rounded-3xl gap-2 h-40'>
                    <Icon name="user-tie" size={70} color="#000" />
                    <Text className='text-xl font-medium'>Staffs</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Index