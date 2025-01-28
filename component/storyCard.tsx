import { View, Text, Image } from 'react-native'
import React from 'react'

const StoryCard = ({ i }: { i: number }) => {
    return (
        <View className="flex-row p-2 bg-zinc-700 w-[120px] h-44 rounded-lg mr-2" key={i}>
            <Image
                source={require('../assets/images/devAssets/profile1.png')}
                className="w-8 h-8 rounded-full"
            />
            <View className='flex-col justify-center h-8 ml-2'>
                <Text className="text-white font-bold text-[12px]">Swetha</Text>
                <Text className="text-white text-[9px]">CSE - HOD</Text>
            </View>
        </View>
    )
}

export default StoryCard