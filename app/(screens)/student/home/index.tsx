import Header from '@/component/profileHeader';
import StoryCard from '@/component/storyCard';
import { useUser } from '@/context/userContext';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const { router } = useUser()
  return (
    <SafeAreaView>
      <ScrollView className={`p-3`}>
        <Header />
        <View className='flex gap-2 pt-3'>
          <Text className='text-xl text-start'>College Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {
              [1, 2, 3, 4, 5].map((e, i) => {
                return (
                  <StoryCard i={i} key={i}/>
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
                <View className="flex-row justify-around items-center bg-white p-4 rounded-lg shadow-md overflow-hidden" key={i}>
                  <View className="w-4/6 flex-row items-center gap-2">
                    <Image
                      source={require('../../../../assets/images/devAssets/subImage1.png')}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="w-2/3 flex flex-wrap">
                      <Text className="text-lg font-bold ">19CST701</Text>
                      <Text className="text-gray-500 w-full leading-xl">Software & Architecture Design</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="w-fit bg-primary px-5 py-3 rounded-lg" onPress={() => router.push('/student/home/request')}>
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