import Header from '@/component/header';
import { faqs } from '@/utils/data';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpSupportScreen() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQs=(index:number)=>{
    if(index !== openFAQ ) {
        setOpenFAQ(index);
        return;
    }
    setOpenFAQ(null)
  }
  

  return (
    <SafeAreaView className="flex-1 flex-col justify-between bg-white p-4">
        <View>
            <Header text="Help & Support" />
            <Text className="text-xl font-semibold mt-5">FAQs</Text>
            {
                faqs.map((faq, index) => (
                    <View key={index} className="my-2">
                        <TouchableOpacity onPress={() => toggleFAQs(index)} className="flex-row justify-between items-center">
                            <Text className="text-lg w-5/6 ">{faq.question}</Text>
                            <Ionicons name={openFAQ === index ? 'chevron-up' : 'chevron-down'} size={20} color="black"  className='w-1/6' />
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
    </SafeAreaView>
  );
}
