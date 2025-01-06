import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/userContext';

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

        <View className="flex-row tems-center w-full py-3 px-1">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
            className="w-16 h-16 rounded-full"
          />
          <View className="flex-row items-center px-2 justify-between bg-red-300 w-full">
            <View className="">
              <Text className="text-xl font-bold">{ user?.name }</Text>
              <Text className="text-gray-500">Assistant Professor - CSE</Text>
            </View>
            <TouchableOpacity className="">
              <Icon name="logout" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* College Updates Section */}
        <Text className="text-lg font-bold my-5">College Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="items-center mr-4">
            <View className="w-20 h-30 bg-green-100 justify-center items-center rounded-lg">
              <Text className="text-4xl text-black">+</Text>
            </View>
            <Text>Add to Your Story</Text>
          </View>

          <View className="items-center mr-4">
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=2' }} className="w-20 h-30 rounded-lg" />
            <Text>Dr.Satish Kumar</Text>
            <Text>Principal</Text>
          </View>

          <View className="items-center mr-4">
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} className="w-20 h-30 rounded-lg" />
            <Text>Karthikayan</Text>
            <Text>Dean</Text>
          </View>

          <View className="items-center mr-4">
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=4' }} className="w-20 h-30 rounded-lg" />
            <Text>Vimal</Text>
            <Text>HOD</Text>
          </View>
        </ScrollView>

        {/* Pending Requests Section */}
        <Text className="text-lg font-bold my-5">Pending Request</Text>
        {requests.map((request) => (
          <View key={request.id} className="flex-row items-center py-2.5 border-b border-gray-200">
            <Image
              source={{ uri: `https://i.pravatar.cc/150?img=${request.id + 5}` }}
              className="w-12.5 h-12.5 rounded-full"
            />
            <View className="flex-1 ml-2.5">
              <Text className="font-bold">{request.name}</Text>
              <Text className="text-gray-500">{request.regNo} - {request.dept}</Text>
            </View>

            <TouchableOpacity className="bg-red-500 py-1.5 px-4 rounded-lg mr-1.5">
              <Text className="text-white">Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-green-600 py-1.5 px-4 rounded-lg">
              <Text className="text-white">Accept</Text>
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
