import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';


const SubjectInfo = () => {
    return (
        <View className="flex-1 bg-white space-y-4 h-full">
            <View className="w-full h-52 my-3 bg-gray-200 rounded-lg justify-center items-center">
                <Image source={require('../../assets/images/devAssets/subImgBig.png')} className="w-full h-full" />
            </View>
            <View className="space-y-2">
                <Text className="text-xl font-semibold mb-2">About Software Architecture & Design?</Text>
                <Text className="text-lg text-gray-600">
                    Discover the foundations of robust and scalable software with our insights on Software Architecture and Design.
                    Learn how to create systems that are maintainable, secure, and efficient.
                </Text>
                <View className="flex">
                    <Text className="text-lg font-semibold">Subject Staff</Text>
                    <Text className="text-lg text-gray-600">Dr. B. Sujatha, Dean Academics.</Text>
                </View>

                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg font-semibold">Portion</Text>
                        <Text className="text-lg text-gray-600">Completed</Text>
                    </View>
                    <View>
                        <Text className="text-lg font-semibold">Assignment’ s</Text>
                        <Text className="text-lg text-gray-600">Completed</Text>
                    </View>
                    <View>
                        <Text className="text-lg font-semibold">CIA’ s</Text>
                        <Text className="text-lg text-gray-600">Passed</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity className="bg-blue-500 py-3 rounded-xl items-center">
                <Text className="text-white font-medium text-lg">Request</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SubjectInfo;
