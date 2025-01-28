import React from 'react'
import IconDisplay from 'react-native-vector-icons/FontAwesome6'
import InternalMarks from './internalMarks'
import { useUser } from '@/context/userContext'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Mark = () => {
  const { router } = useUser();
  const images = [
    {
      title: 'I',
      img: require('../../../../assets/images/devAssets/internalImages/image1.png')
    },
    {
      title: 'II',
      img: require('../../../../assets/images/devAssets/internalImages/image2.png')
    },
    {
      title: 'III',
      img: require('../../../../assets/images/devAssets/internalImages/image3.png')
    },
  ]
  return (
    <SafeAreaView className='flex-1 items-center p-5'>
      <View className='relative flex flex-row justify-center items-center w-full'>
        <TouchableOpacity className='absolute left-0 '>
          <IconDisplay name='arrow-left' size={25} />
        </TouchableOpacity>
        <Text className='text-2xl font-medium'>Internal Marks</Text>
      </View>
      <View className='flex w-full space-y-3 h-full justify-center'>
        {
          images.map((e, i) => {
            return (
              <TouchableOpacity onPress={() => router.push('/student/marks/internalMarks')} key={i} className='overflow-hidden rounded-xl'>
                <ImageBackground source={e.img} resizeMode='cover' resizeMethod='resize' className='relative flex justify-center items-center w-full  h-[180px]'>
                  <Text className='text-xl text-white font-medium'>Continuous Internal Assessment-{e.title}</Text>
                  <View className="absolute bottom-3 flex flex-row px-3 w-full justify-between">
                    <Text className='text-lg font-normal text-white'>Date: 07.09.2024</Text>
                    <Text className='text-lg font-normal text-white'>Status: Fail</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <InternalMarks />
    </SafeAreaView>
  )
}

export default Mark