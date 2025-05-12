import Header from '@/component/header';
import { notifications } from '@/constants/subjects';
import { useUser } from '@/context/userContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FABrand from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Notifications() {
  const { router } = useUser()
  return (
    <SafeAreaView className="flex-1 bg-white px-5 ">
      <Header text="Notifications" className="" />
      <StatusBar style='dark'/>
      <View className="flex-row items-center bg-gray-200 rounded-xl px-3 my-3 gap-2 mt-5">
        <Icon name='search' size={20} />
        <TextInput placeholder="Search Your Notification..." className="flex-1" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row justify-between gap-2 items-center">
          <MaterialIcons name='tune' size={25} />
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row gap-2">
            <FABrand name='telegram-plane' size={18} />
            <Text className="text-gray-700">Nodue Request</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row gap-2">
            <Icon name='mail-unread-outline' size={18} />
            <Text className="text-gray-700">Unread</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-100 py-2 px-3 rounded-full flex-row gap-2">
            <AntDesignIcon name='staro' size={18} />
            <Text className="text-gray-700">Favourite</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className='mt-3'>
        {
          notifications.map((item, i) => {
            return (
              <View
                key={i}
                className={`rounded-xl p-4 mb-4 shadow-sm border-l-4 ${item.status ? 'border-green-500 bg-white' : 'border-red-500 bg-rose-50'
                  }`}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-indigo-600 rounded-full w-10 h-10 justify-center items-center">
                      <Text className="text-white font-semibold">{item.icon}</Text>
                    </View>
                    <View>
                      <Text className="text-gray-900 font-semibold">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">{item.role}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-400 text-xs">{item.time}</Text>
                    <Text className="text-gray-400 text-xs">{item.date}</Text>
                  </View>
                </View>

                <Text className="text-gray-700 text-sm mb-3">{item.message}</Text>

                {/* Optional Action Buttons */}
                {!item.status && (
                  <View className="flex-row gap-3">
                    <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-md">
                      <Text className="text-white text-sm">Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-md">
                      <Text className="text-white text-sm">Ignore</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
}




