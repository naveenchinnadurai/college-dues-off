import { data } from '@/constants/subjects';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import IconDisplay from 'react-native-vector-icons/MaterialCommunityIcons';

import { Link, useNavigation } from 'expo-router';

const InternalMarks = () => {
  const navigate = useNavigation()
  return (
    <SafeAreaView className="h-full flex-col justify-between p-3" >
      <View className='relative flex flex-row justify-center items-center w-full'>
        <TouchableOpacity className='absolute left-0 ' onPress={() => navigate.goBack()}>
          <FAIcon name='arrow-left' size={25} />
        </TouchableOpacity>
        <Text className='text-2xl font-medium'>Internal Marks</Text>
      </View>
      <View className="flex mt-4">
        <Text className="text-[22px] text-center w-full font-bold mb-2">Continuous Internal Assessment-I</Text>
        <View className="w-full flex-row justify-between mb-4">
          <Text className="text-[16px]">No of Subject Passed: 7/7</Text>
          <Text className="text-[16px]">Overall percentage: 80%</Text>
        </View>
        <Text className="text-[18px]">Internal Status: <Text className="text-danger">Failed</Text></Text>
      </View>
      <View className='flex-col items-center justify-center space-y-4 h-fit py-1 mt-3'>
        {data.map((item, index) => (
          <View key={index} className="flex items-center space-y-2 bg-white rounded-xl p-2 py-3 w-full">
            <View className='flex-row'>
              <Image source={require('../../../../assets/images/devAssets/subImage1.png')} className="w-12 h-12 rounded-full mr-2" />
              <View className="flex-1">
                <Text className="font-bold text-lg">{item.id}</Text>
                <Text className="text-gray-600">{item.subject}</Text>
              </View>
              <IconDisplay name='message-text' size={25} />
            </View>
            <View className=" justify-center flex-row w-full space-x-3">
              <TouchableOpacity className="bg-success rounded-md px-4 py-2 flex-row items-center w-4/12">
                <Text className="text-white text-md">Mark: </Text>
                <Text className="text-white text-md">{item.marks}/50</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-success rounded-md px-4 py-2 flex-row items-center w-4/12">
                <Text className="text-white text-md">Percent: </Text>
                <Text className="text-white text-md">{item.marks * 2} %</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`rounded-md px-4 py-2 flex justify-center w-3/12 ${item.marks >= 25 ? "bg-success" : "bg-danger"}`}>
                <Text className="text-white text-center text-md">{item.marks >= 25 ? "Pass" : "Fail"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default InternalMarks;
