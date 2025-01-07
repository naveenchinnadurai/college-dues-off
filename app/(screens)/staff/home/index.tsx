import HomeHeader from '@/component/homeHeader';
import StoryCard from '@/component/storyCard';
import { useUser } from '@/context/userContext';
import FeatherIcon from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useUser()
  const requests = [
    { id: 1, name: 'Akash K', regNo: '6123212006', dept: 'CSE (IV)' },
    { id: 2, name: 'John D.', regNo: '6123212007', dept: 'EE (II)' },
    { id: 3, name: 'Maria S.', regNo: '6123212008', dept: 'IT (III)' },
    { id: 4, name: 'David L.', regNo: '6123212009', dept: 'ME (I)' },
    { id: 5, name: 'Emily M.', regNo: '6123211210', dept: 'ECE (IV)' },
    { id: 6, name: 'Sophia K.', regNo: '6123211211', dept: 'CSE (III)' },
  ];

  return (
    <ScrollView className="flex h-screen w-screen bg-white px-4">
      <SafeAreaView>
        {/* Profile Section */}
        <HomeHeader />

        {/* College Updates Section */}
        <Text className="text-lg font-bold my-3">College Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-2">
          <View className="w-[117px] h-44 bg-green-100 justify-center items-center rounded-lg">
            <Text className="text-4xl text-black">+</Text>
            <Text className='text-sm w-4/5 text-center'>Add to Your Story</Text>
          </View>
          <>
            {
              [1, 2, 3, 4, 5].map((e, i) => {
                return (
                  <StoryCard i={i} />
                )
              })
            }
          </>
        </ScrollView>

        {/* Pending Requests Section */}
        <Text className="text-lg font-bold my-2">Pending Request</Text>
        {requests.map((request) => (
          <View key={request.id} className="flex-row items-center justify-between py-2.5 border-b border-gray-200">
            <View className='flex-row items-center space-x-2 w-fit'>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?img=${request.id + 5}` }}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-col">
                <Text className="font-bold mb-0.5 text-[17px]">{request.name}</Text>
                <Text className="text-gray-500 text-[13px]">{request.regNo} - {request.dept}</Text>
              </View>
            </View>

            <View className='flex-row items-center space-x-2'>
              <TouchableOpacity className="border border-red-500 py-1.5 px-3 rounded-lg">
                <FeatherIcon name='x' size={20} color="red" />
              </TouchableOpacity>

              <TouchableOpacity className="border border-green-600 py-1.5 px-3 rounded-lg">
                <FeatherIcon name='check' size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
