
import { useUser } from '@/context/userContext';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'


const NoDueRequest = () => {
    const { router, subjects, user } = useUser();

    return (
        <SafeAreaView>
            {/* No Due Request by Subject */}
            <View className="gap-3 my-6 px-3">
                <View className="flex-row items-center justify-between">
                    <View className='gap-2 flex-row'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="arrowleft" size={26} color="black" />
                        </TouchableOpacity>
                        <Text className="text-2xl font-semibold">No Due Request</Text>
                    </View>
                    <Feather name="refresh-cw" size={20} color="gray" />
                </View>
                {subjects?.map((e: { subCode: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; subName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => (
                    <View
                        key={i}
                        className="bg-white p-4 rounded-xl shadow-md flex-row justify-between items-center"
                    >
                        <View className="flex-row items-center gap-3 w-2/3">
                            <Image
                                source={require('../../../../assets/images/devAssets/subImage1.png')}
                                className="w-12 h-12 rounded-full"
                            />
                            <View>
                                <Text className="text-md font-bold text-gray-800">{e.subCode}</Text>
                                <Text className="text-gray-500">{e.subName}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('/student/home/request')}
                            className="bg-primary px-4 py-2 rounded-md"
                        >
                            <Text className="text-white font-semibold">Request</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default NoDueRequest
