import React from 'react';
import Header from '@/component/header';
import SubjectInfo from '@/component/subjectInfo';
import { useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Request = () => {
    return (
        <SafeAreaView className='h-full p-4 bg-white'>
            <View className='flex-row items-center gap-3'>
                <Header text=""/>
                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-xl font-bold">19CST701</Text>
                    <Text className="text-lg text-gray-500">Software & Architecture Design</Text>
                </View>
            </View>
            <SubjectInfo/>
        </SafeAreaView>
    )
}

export default Request