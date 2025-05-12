import Header from '@/component/header';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

interface Prop {
    question: string;
    answer: string;
}


const FAQS = ({ faqs }: { faqs: Prop[] }) => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const toggleFAQs = (index: number) => {
        if (index !== openFAQ) {
            setOpenFAQ(index);
            return;
        }
        setOpenFAQ(null)
    }
    return (
        <View className='flex flex-col justify-between h-full'>
            <View>
                <Header text="Help & Support" />
                <Text className="text-2xl font-semibold mt-5">FAQs</Text>
                {
                    faqs.map((faq: Prop, index: number) => (
                        <View key={index} className="my-2 w-full">
                            <TouchableOpacity onPress={() => toggleFAQs(index)} className="flex-row justify-between items-center">
                                <Text className="text-lg w-[94%]">{faq.question}</Text>
                                <Ionicons name={openFAQ === index ? 'chevron-up' : 'chevron-down'} size={20} color="black" className='w-fit' />
                            </TouchableOpacity>
                            {
                                openFAQ === index && (
                                    <Text className="text-gray-600 mt-2 text-base leading-relaxed text-left">{faq.answer}</Text>
                                )
                            }
                        </View>
                    ))
                }
            </View>

            <View className="">
                <Text className="text-xl font-semibold mb-1">Contact us</Text>
                <View className='flex-row w-screen flex-wrap space-x-1'>
                    <Text className="text-gray-600 flex"> Reach us via email at</Text>
                    <Text
                        className="text-blue-600"
                        onPress={() => Linking.openURL('mailto:support@collegeduesoff.com')}
                    >
                        support@collegeduesoff.com
                    </Text>
                    <Text>or call us at</Text>
                    <Text className="text-blue-600" onPress={() => Linking.openURL('tel:9232131231')}>[923-213-123-1]</Text>
                </View>
                <Text className="text-center text-gray-400 mt-5">V.10.01</Text>
            </View>
        </View>
    )
}

export default FAQS