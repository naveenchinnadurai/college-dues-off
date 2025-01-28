import { useUser } from '@/context/userContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckBox from 'react-native-vector-icons/Fontisto';

interface credentialType {
    rollNo: string;
    password: string
}

const Index = () => {
    const { setUser, router } = useUser()
    const [credential, setCredential] = useState<credentialType>({
        rollNo: "",
        password: ""
    })
    const [isChecked, setIsChecked] = useState(false); //remember me checkbox
    const [showPassword, setShowPassword] = useState(false); //eye button for password
    const floating = [
        {
            img: require('../../assets/images/floatings/bookImg1.png'),
            styles: "top-60 left-16 "
        },
        {
            img: require('../../assets/images/floatings/bookImg2.png'),
            styles: "top-28 left-24"
        },
        {
            img: require('../../assets/images/floatings/bookImg3.png'),
            styles: "top-8 right-56"
        },
        {
            img: require('../../assets/images/floatings/bookImg4.png'),
            styles: "top-48 right-8"
        },
        {
            img: require('../../assets/images/floatings/bookImg5.png'),
            styles: "top-20 right-24"
        }
    ]

    const handleInputChange = (field: string, value: string) => {  //updates credential object when inputs changes
        setCredential({ ...credential, [field]: value });
    };

    const handleLogin = () => {
        //console.log(credential); //checking log!
        setUser({
            id: credential.rollNo,
            name: "Swetha Kumar",
            email: "07092004swethak@gmail.com",
            type: "student",
            department: "Agriculture Science",
            role: "student"
        })
        router.push('/(screens)/student/home')
    };


    return (
        <SafeAreaView className='bg-white flex-1 overflow-hidden items-center'>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View className='w-full h-4/6'>
                {
                    floating.map((e, i) => {
                        return (
                            <Image source={e.img} className={`absolute h-10 w-10 ${e.styles}`} />
                        )
                    })
                }
                <Image source={require('../../assets/images/bgPattern.png')} />
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
                                placeholder="Roll Number"
                                className='bg-[#DEDEDE] px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.rollNo}
                                onChangeText={(text) => handleInputChange('rollNo', text)}
                            />
                            <TextInput
                                placeholder="Password"
                                className='bg-[#DEDEDE]  px-4 py-3 rounded-md  w-full text-lg text-[#6F6C6C]'
                                value={credential?.password}
                                secureTextEntry={showPassword}
                                onChangeText={(text) => handleInputChange('password', text)}
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
                        <TouchableOpacity className='bg-primary px-4 py-2 rounded-md ' onPress={() => handleLogin()}>
                            <Text className='text-white text-xl text-center'>Login</Text>
                        </TouchableOpacity>
                        <Link href="/" className='px-4 py-2 rounded-md flex w-full text-xl text-primary text-center'>
                            Back
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index