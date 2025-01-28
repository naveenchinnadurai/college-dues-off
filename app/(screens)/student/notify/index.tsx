import { notifications } from '@/constants/subjects';
import { useUser } from '@/context/userContext';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FABrand from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Notifications() {
  const { router } = useUser()
  return (
    <SafeAreaView className="flex-1 bg-white p-5 ">
      <View className='relative flex flex-row justify-center items-center w-full'>
        <TouchableOpacity className='absolute left-0 ' onPress={() => router.push('/(screens)/student/home')}>
          <FAIcon name='arrow-left' size={25} />
        </TouchableOpacity>
        <Text className='text-2xl font-medium'>Notifications</Text>
      </View>
      <View className="flex-row items-center bg-gray-200 rounded-xl p-3 my-3 space-x-2 mt-5">
        <Icon name='search' size={20} />
        <TextInput placeholder="Search Your Notification..." className="flex-1" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row justify-between space-x-2 items-center">
          <MaterialIcons name='tune' size={25} />
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row space-x-2">
            <FABrand name='telegram-plane' size={18} />
            <Text className="text-gray-700">Nodue Request</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row space-x-2">
            <Icon name='mail-unread-outline' size={18} />
            <Text className="text-gray-700">Unread</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row space-x-2">
            <AntDesignIcon name='staro' size={18} />
            <Text className="text-gray-700">Favourite</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className='mt-3'>
        {
          notifications.map((item, i) => {
            return (
              <View key={i} className={`flex-row items-center justify-between  ${item.status ? 'bg-green-100' : 'bg-rose-100'}  p-4 rounded-lg mb-3`}>
                <View className="flex-row items-center">
                  <View className={`w-12 h-12 rounded-full flex items-center justify-center bg-purple-700 mr-4`}>
                    <Text className="text-white text-lg font-bold">{item.icon}</Text>
                  </View>
                  <View>
                    <Text className="text-black font-medium">{item.name}</Text>
                    <Text className="text-gray-500">{item.role}</Text>
                    <Text className={`font-medium ${item.textColor}`}>{item.message}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-gray-500 text-sm">{item.time}</Text>
                  <Text className="text-gray-500 text-sm">{item.date}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
}
