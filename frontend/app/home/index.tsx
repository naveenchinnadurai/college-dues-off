import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <ScrollView>
      <SafeAreaView className='flex p-3'>
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/images/devAssets/profile.png')}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-2xl font-semibold">Akash k</Text>
              <Text className="text-gray-500 text-lg">21UCS006</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="logout" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View className='flex gap-2 pt-3'>
          <Text className='text-xl text-start'>College Updated</Text>
          <View className="rounded-2xl overflow-hidden flex-row gap-1 justify-between">
            {
              [1, 2, 3].map(() => {
                return (
                  <View className="flex-row py-2 gap-1 bg-gray-300 px-1 h-[180px] w-1/3 rounded-2xl">
                    <Image
                      source={require('../../assets/images/devAssets/profile1.png')}
                      className="w-8 h-8 rounded-full"
                    />
                    <View className='flex-col gap-1 justify-center h-8'>
                      <Text className="text-white font-bold text-md">Swetha</Text>
                      <Text className="text-white text-xs">CSE - HOD</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='pt-3 flex gap-2'>
          <Text className="text-2xl font-medium">No Due Request</Text>
          {
            [1, 2, 3, 4, 5].map(() => {
              return (
                <View className="flex-row justify-around items-center p-4 bg-white rounded-lg shadow-md">
                  <View className="flex-row items-center gap-2">
                    <Image
                      source={require('../../assets/images/devAssets/subImage1.png')}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="">
                      <Text className="text-lg font-bold w-1/2">19CST701</Text>
                      <Text className="text-gray-500 w-2/3">Software & Architecture Design</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-lg">
                    <Text className="text-white font-bold">Request</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Index