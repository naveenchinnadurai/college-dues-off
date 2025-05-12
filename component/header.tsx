import React, { ReactNode } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';

interface Props {
    text?: String;
    iconStyle?: {
        size?: number;
        color?: string;
    };
    className?: String;
    children?: ReactNode;
}

export default function Header(props: Props) {
    const navigate = useNavigation();
    return (
        <View className={`flex-row justify-center items-center py-2 relative ${props.className}`}>
            <TouchableOpacity onPress={() => navigate.goBack()} className={`absolute left-0 top-2`} >
                <Icon name='arrow-left' size={props.iconStyle?.size || 25} color={props.iconStyle?.color || 'black'}/>
            </TouchableOpacity>
            {
                props.children ? (
                    <>
                        {props.children}
                    </>
                ) : (
                    <Text className='text-2xl font-bold'>{props.text}</Text>
                )
            }
        </View>
    )
}