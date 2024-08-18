import { View, FlatList, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'react-native-vector-icons/Fontisto'
import { Image } from 'react-native';
import { Link } from 'expo-router';

interface credentialType {
    userName: string;
    password: string
}

const Index = () => {
    const [credential, setCredential] = useState<credentialType | undefined>()
    const [isChecked, setIsChecked] = useState(false);
    const floating = [
        {
            img: require('../../../assets/images/floatings/bookImg1.png'),
            styles: ""
        },
        {
            img: require('../../../assets/images/floatings/bookImg2.png'),
            styles: ""
        },
        {
            img: require('../../../assets/images/floatings/bookImg3.png'),
            styles: ""
        },
        {
            img: require('../../../assets/images/floatings/bookImg4.png'),
            styles: ""
        },
        {
            img: require('../../../assets/images/floatings/bookImg5.png'),
            styles: ""
        }
    ]
    return (
        <SafeAreaView className='bg-white flex-1 overflow-hidden items-center'>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View className='w-full h-4/6'>
                <Image source={floating[0].img} className={`absolute top-60 left-12 h-10 w-10`} />
                <Image source={floating[1].img} className={`absolute top-36 left-28 h-10 w-10`} />
                <Image source={floating[2].img} className={`absolute top-8 right-56 h-10 w-10`} />
                <Image source={floating[3].img} className={`absolute top-48 right-10 h-10 w-10`} />
                <Image source={floating[4].img} className={`absolute top-20 right-24 h-10 w-10`} />
                <Image source={require('../../../assets/images/bgPattern.png')} />
            </View>
            <View
                className='bg-white h-4/6 -mt-[68%] shadow-xl rounded-t-full p-5 w-[700px]'
                style={{
                    shadowColor: '#2A68F1',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0,
                    shadowRadius: 100,
                }}
            >
                <View className='py-3 px-10 flex gap-1 flex-col justify-center items-center rounded-3xl'>
                    <Icon name="user-graduate" size={80} color="#000" />
                    <Text className='text-xl font-medium'>Student Login</Text>
                </View>
                <View className='flex flex-col p-1 gap-8 items-center'>
                    <View className='flex space-y-3'>
                        <View className='space-y-3 w-[300px]'>
                            <TextInput
                                placeholder="Register Number"
                                className='bg-[#DEDEDE] px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.userName}
                            />
                            <TextInput
                                placeholder="Password"
                                className='bg-[#DEDEDE]  px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.userName}
                            />
                        </View>
                        <View className=' w-[300px] flex flex-row justify-between'>
                            <View className='flex space-x-2 px-1 flex-row items-center'>
                                <TouchableOpacity className='w-4 justify-center items-center' onPress={() => setIsChecked(!isChecked)}>
                                        <CheckBox name={isChecked ? "checkbox-passive" : "checkbox-active"} size={15} />
                                </TouchableOpacity>
                                <Text className='text-[#6F6C6C] text-md'>Remember Me</Text>
                            </View>
                            <Text className='text-md border-b text-[#6F6C6C] border-b-[#6F6C6C]'>Forget Password</Text>
                        </View>
                    </View>
                    <View className='flex space-y-3 w-[300px]'>
                        <Link href='/onBoarding' className='text-xl text-center bg-primary px-4 py-2 rounded-md text-white'>Login</Link>
                        <Link href="/" className='px-4 py-2 rounded-md text-xl text-primary text-center'>Back</Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index