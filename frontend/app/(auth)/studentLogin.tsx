import { View, FlatList, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'react-native-vector-icons/Fontisto'
import { Image } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { useUser } from '@/context/userContext';

interface credentialType {
    rollNo: string;
    password: string
}

const Index = () => {
    const { setUser } = useUser()
    const navigate = useNavigation()
    const [credential, setCredential] = useState<credentialType>({
        rollNo: "",
        password: ""
    })
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const floating = [
        {
            img: require('../../assets/images/floatings/bookImg1.png'),
            styles: ""
        },
        {
            img: require('../../assets/images/floatings/bookImg2.png'),
            styles: ""
        },
        {
            img: require('../../assets/images/floatings/bookImg3.png'),
            styles: ""
        },
        {
            img: require('../../assets/images/floatings/bookImg4.png'),
            styles: ""
        },
        {
            img: require('../../assets/images/floatings/bookImg5.png'),
            styles: ""
        }
    ]

    const handleInputChange = (field: string, value: string) => {
        setCredential({ ...credential, [field]: value });
    };

    const handleLogin = () => {
        console.log(credential);
        setUser({
            id: credential.rollNo,
            name: "Swetha Kumar",
            email: "07092004swethak@gmail.com",
            type: "student",
            department: "Agriculture"
        })
    };


    return (
        <SafeAreaView className='bg-white flex-1 overflow-hidden items-center'>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View className='w-full h-4/6'>
                <Image source={floating[0].img} className={`absolute top-60 left-16 h-10 w-10`} />
                <Image source={floating[1].img} className={`absolute top-28 left-24 h-10 w-10`} />
                <Image source={floating[2].img} className={`absolute top-8 right-56 h-10 w-10`} />
                <Image source={floating[3].img} className={`absolute top-48 right-8 h-10 w-10`} />
                <Image source={floating[4].img} className={`absolute top-20 right-24 h-10 w-10`} />
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
                        <TouchableOpacity className='bg-primary px-4 py-2 rounded-md ' onPress={handleLogin}>
                            <Link href="/onBoarding" className='text-white text-xl text-center'>Login</Link>
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