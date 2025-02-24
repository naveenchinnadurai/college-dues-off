import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className='flex-row justify-center items-center h-screen'>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default index