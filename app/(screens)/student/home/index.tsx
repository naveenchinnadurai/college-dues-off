import Icon from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {
  const { user, logout, router } = useUser()
  const [name, setName] = useState("")
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const fetchData = async () => {
    const res = await fetch('http://192.168.38.74:7000/')
      .then(response => response.json())
      .then(data => {
        setName(data.name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className={`p-3 ${modalVisible ? "opacity-40 blur-xl" : ""}`}>
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center">
            <Image
              source={require('../../../../assets/images/devAssets/profile.jpg')}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-2xl font-semibold">{name}</Text>
              <Text className="text-gray-500 text-lg">{user?.id}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="logout" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Modal animationType='none' transparent={true} visible={modalVisible} >
          <View className='h-full w-full items-center justify-center'>
            <View className='bg-white space-y-3 rounded-xl w-2/3 py-5 px-4 items-center justify-center'>
              <Text className='text-xl text-center font-medium'>Are You Sure you want to Log out ?</Text>
              <TouchableOpacity onPress={() => { logout(); setModalVisible(false) }} className='bg-danger w-full py-2 rounded-xl'>
                <Text className='text-lg text-white text-center font-medium'>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className=' w-full py-2 rounded-xl'>
                <Text className='text-lg text-black text-center font-medium'>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View className='flex gap-2 pt-3'>
          <Text className='text-xl text-start'>College Updated</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1">
            {
              [1, 2, 3,4,5].map((e, i) => {
                return (
                  <View className="flex-row py-2 gap-1 bg-gray-300 px-1 h-[180px] w-1/3 rounded-2xl" key={i}>
                    <Image
                      source={require('../../../../assets/images/devAssets/profile1.png')}
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