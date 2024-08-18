import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router';
import CheckBox from 'react-native-vector-icons/Fontisto'
import Staff from 'react-native-vector-icons/FontAwesome5'
import { Image } from 'react-native';

interface credentialType {
    userName: string;
    password: string
}

const Index = () => {
    const [credential, setCredential] = useState<credentialType | undefined>()
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SafeAreaView className='bg-white flex-1 overflow-hidden items-center'>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View className='w-full h-4/6'>
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
                    <Staff name="chalkboard-teacher" size={80} color="#000" />
                    <Text className='text-xl font-medium'>Staffs Login</Text>
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
                                    {isChecked ? (
                                        <CheckBox name="checkbox-passive" size={15} />
                                    ) : (
                                        <CheckBox name="checkbox-active" size={15} />
                                    )}
                                </TouchableOpacity>
                                <Text className='text-[#6F6C6C] text-md'>Remember Me</Text>
                            </View>
                            <Text className='text-md border-b text-[#6F6C6C] border-b-[#6F6C6C]'>Forget Password</Text>
                        </View>
                    </View>
                    <View className='flex space-y-3 w-[300px]'>
                        <Link href='/onBoarding' className='text-xl text-center bg-[#54C15F] px-4 py-2 rounded-md text-white'>Login</Link>
                        <Link href="/" className='px-4 py-2 rounded-md text-xl text-[#54C15F] text-center'>Back</Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index