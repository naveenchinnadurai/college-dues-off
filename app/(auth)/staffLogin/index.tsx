import { useUser } from '@/context/userContext';
import API from '@/utils/api';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Staff from 'react-native-vector-icons/FontAwesome5';
import CheckBox from 'react-native-vector-icons/Fontisto';

interface credentialType {
    email: string;
    password: string;
}

const Index = () => {
    const { setUser, router } = useUser();
    const [credential, setCredential] = useState<credentialType>({
        email: "",
        password: ""
    })
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (field: string, value: string) => {  //updates credential object when inputs changes
        setCredential({ ...credential, [field]: value });
    };

    const handleLogin = async () => {
        console.log(credential); //checking log!
        setUser({
            id: '1234567890',
            name: 'Dr. M. Sakthivel',
            email: 'sakthivelcsehod@sec.com',
            type: "staff",
            department: "Computer Science",
            role: "HOD - CSE"
        })
        router.push('/(screens)/onboarding')
        // try {
        //     const res = await API.post('/auth/staff/login', { email: credential.email, password: credential.password })

        //     console.log(res.data.data.user);
        //     if (res.status) {
        //         setUser({
        //             id: res.data.data.user.id,
        //             name: res.data.data.user.name,
        //             email: res.data.data.user.email,
        //             type: "staff",
        //             department: "Computer Science",
        //             role: "Assistant Proffessor - CSE"
        //         })
        //         router.push('/(screens)/onboarding')
        //     }
        // } catch (error: any) {
        //     console.log("Error in login: ", error);
        // }
    };

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
                    <View className='flex gap-3'>
                        <View className='gap-3 w-[300px]'>
                            <TextInput
                                placeholder="Email Id"
                                className='!bg-[#DEDEDE] px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            <TextInput
                                placeholder="Password"
                                className='bg-[#DEDEDE]  px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.password}
                                onChangeText={(text) => handleInputChange('password', text)}

                            />
                        </View>
                        <View className=' w-[300px] flex flex-row justify-between'>
                            <View className='flex gap-2 px-1 flex-row items-center'>
                                <TouchableOpacity className='w-4 justify-center items-center' onPress={() => setIsChecked(!isChecked)}>
                                    {
                                        isChecked ? (
                                            <CheckBox name="checkbox-passive" size={15} />
                                        ) : (
                                            <CheckBox name="checkbox-active" size={15} />
                                        )
                                    }
                                </TouchableOpacity>
                                <Text className='text-[#6F6C6C] text-md'>Remember Me</Text>
                            </View>
                            <Text className='text-md border-b text-[#6F6C6C] border-b-[#6F6C6C]'>Forget Password</Text>
                        </View>
                    </View>
                    <View className='flex gap-3 w-[300px]'>
                        <TouchableOpacity onPress={() => handleLogin()} className=' bg-[#54C15F] px-4 py-3 rounded-md '>
                            <Text className='text-center text-white text-xl'>Login</Text>
                        </TouchableOpacity>
                        <Link href="/" className='px-4 py-2 rounded-md text-xl text-[#54C15F] text-center'>
                            <Text>Back</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index