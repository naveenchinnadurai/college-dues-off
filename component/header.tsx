import React, { ReactNode } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';

interface Props {
    text: String;
    className?: String
}

export default function Header(props: Props) {
    const navigate = useNavigation();
    return (
        <View className={`flex-row justify-center items-center py-2 relative ${props.className}`}>
            <TouchableOpacity onPress={() => navigate.goBack()} className='absolute left-0' >
                <Icon name='arrow-left' size={25} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold w-fit">{props.text}</Text>
        </View>
    )
}