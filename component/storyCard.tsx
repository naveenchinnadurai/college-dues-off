import { View, Text, Image } from 'react-native'
import React from 'react'

const StoryCard = ({ i }: { i: number }) => {
    return (
        <View className="flex-row gap-2 p-2 w-[110px] h-48 rounded-lg mr-2 bg-gray-300" key={i}>
            <Image
                source={require('../assets/images/devAssets/profile1.png')}
                className="w-8 h-8 rounded-full"
            />
            <View className='flex-col'>
                <Text className="text-black font-bold text-xs">Sakthivel</Text>
                <Text className="text-black text-xs">CSE - HOD</Text>
            </View>
        </View>
    )
}

export default StoryCard