import React from 'react'
import { useNavigation } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6'
import SubjectInfo from '@/component/subjectInfo';
const Request = () => {
    const navigate=useNavigation()
    return (
        <SafeAreaView className='h-full p-4 bg-white'>
            <View className='flex-row items-center gap-3'>
                <TouchableOpacity onPress={()=>navigate.goBack()}>
                    <Icon name='arrow-left' size={25} />
                </TouchableOpacity>
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-xl font-bold">19CST701</Text>
                        <Text className="text-lg text-gray-500">Software & Architecture Design</Text>
                    </View>
                </View>
            </View>
            <SubjectInfo/>
        </SafeAreaView>
    )
}

export default Request