import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconDisplay from 'react-native-vector-icons/FontAwesome6'
const Mark = () => {
  return (
    <SafeAreaView className='flex-1 items-center p-5'>
      <View className='relative flex flex-row justify-center items-center w-full'>
        <TouchableOpacity className='absolute left-0 '>
          <IconDisplay name='arrow-left' size={25} />
        </TouchableOpacity>
        <Text className='text-2xl font-medium'>Internal Marks</Text>
      </View>
      <View className='flex w-full mt-4 space-y-3'>
        {
          ['I', 'II', 'III'].map((e) => {
            return (
              <View className='relative flex justify-center items-center bg-slate-300 w-full p-2 rounded-lg h-[180px]'>
                <Text className='text-xl text-white font-medium'>Continuous Internal Assessment-{e}</Text>
                <Text className='absolute bottom-3 text-lg font-normal text-white'>Date: 07.09.2024</Text>
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}

export default Mark