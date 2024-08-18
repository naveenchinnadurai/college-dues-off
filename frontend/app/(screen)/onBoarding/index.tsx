import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useUser } from '../../../context/userContext'
import { StaffOnBoard, StudentOnBoard } from '../../../utils/data'
import Icon from 'react-native-vector-icons/Ionicons'

const Index = () => {
    const router = useRouter()
    const { user } = useUser()
    const [slide, setSlide] = useState<number>(0)
    const flag = user?.type === "Student";
    const Indexs = flag ? StudentOnBoard : StaffOnBoard;
    const nextSlide = () => {
        if (slide != 2) {
            setSlide(slide + 1)
            return;
        }
        router.push('/home')
    }

    const prevSlide = () => {
        if (slide != 0) {
            setSlide(slide - 1)
            return;
        }
    }

    return (
        <View className='flex-1 justify-evenly items-center'>
            {
                slide != 0 ? (
                    <TouchableOpacity onPress={prevSlide} className='absolute left-4'>
                        <Icon name='chevron-back-outline' size={30} />
                    </TouchableOpacity>
                ) : null
            }
            <Link href="/home" className={`absolute right-5 text-xl font-medium border-b-2 ${flag ? 'text-primary border-b-primary' : 'text-[#54C15F] border-b-[#54C15F]'}`}>Skip</Link>
            <View className='w-full h-2/3 justify-center items-center'>
                <Image source={Indexs[slide].img} className='w-2/3 h-1/2' />
                <Text className='text-xl font-medium mt-5 w-5/6 text-center'>{Indexs[slide].text}</Text>
            </View>
            <View className='flex flex-row gap-2 justify-center items-center '>
                <View className={`w-3 h-3 rounded-full ${slide === 0 ? 'bg-gray-600' : 'bg-gray-400'}`}></View>
                <View className={`w-3 h-3 rounded-full ${slide === 1 ? 'bg-gray-600' : 'bg-gray-400'}`}></View>
                <View className={`w-3 h-3 rounded-full ${slide === 2 ? 'bg-gray-600' : 'bg-gray-400'}`}></View>
            </View>
            <TouchableOpacity className={`w-5/6 py-3 px-3 rounded-lg items-center ${flag ? 'bg-primary' : 'bg-[#54C15F]'}`} onPress={nextSlide}>
                <Text className='text-xl text-white'>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Index