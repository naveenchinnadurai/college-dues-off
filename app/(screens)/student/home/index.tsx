import HomeHeader from '@/component/homeHeader';
import StoryCard from '@/component/storyCard';
import { useUser } from '@/context/userContext';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const { router } = useUser()

  return (
    <SafeAreaView>
      <ScrollView className={`p-3 `}>
        <HomeHeader />
        <View className='flex gap-2 pt-3'>
          <Text className='text-xl text-start'>College Updated</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1">
            {
              [1, 2, 3, 4, 5].map((e, i) => {
                return (
                  <StoryCard i={i} />
                )
              })
            }
          </ScrollView>
        </View>
        <View className='pt-3 flex gap-2 pb-5'>
          <Text className="text-2xl font-medium">No Due Request</Text>
          {
            [1, 2, 3, 4, 5].map((e, i) => {
              return (
                <View className="flex-row justify-around items-center p-4 bg-white rounded-lg shadow-md" key={i}>
                  <View className="flex-row items-center gap-2">
                    <Image
                      source={require('../../../../assets/images/devAssets/subImage1.png')}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="">
                      <Text className="text-lg font-bold w-1/2">19CST701</Text>
                      <Text className="text-gray-500 w-2/3">Software & Architecture Design</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-primary px-5 py-3 rounded-lg" onPress={() => router.push('/student/home/request')}>
                    <Text className="text-white font-bold">Request</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Index