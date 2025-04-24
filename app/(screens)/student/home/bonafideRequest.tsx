import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUser } from '@/context/userContext';

export default function BonafideRequest() {
    const { router } = useUser();

    const [bonafideType, setBonafideType] = useState('General');
    const [purpose, setPurpose] = useState('');
    const [description, setDescription] = useState('');
    const [history, setHistory] = useState([
        {
            id: '1',
            type: 'Scholarship',
            purpose: 'To apply for government scholarship',
            status: 'Approved',
            date: '2024-09-01',
        },
        {
            id: '2',
            type: 'Passport',
            purpose: 'Address verification for passport',
            status: 'Pending',
            date: '2024-10-15',
        },
    ]);

    const handleSubmit = () => {
        if (!purpose.trim()) {
            Alert.alert('Missing Info', 'Please enter a valid purpose.');
            return;
        }

        const newRequest = {
            id: String(history.length + 1),
            type: bonafideType,
            purpose,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };

        setHistory([newRequest, ...history]);
        Alert.alert('Request Sent', 'Your bonafide request has been submitted.');
        setPurpose('');
        setDescription('');
        setBonafideType('General');
    };

    const renderHistoryItem = ({ item }: { item: any }) => (
        <View className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-base font-semibold text-gray-800">{item.type}</Text>
                <Text
                    className={`text-xs px-2 py-1 rounded-full ${item.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                >
                    {item.status}
                </Text>
            </View>
            <Text className="text-gray-600 text-sm mb-1">Purpose: {item.purpose}</Text>
            <Text className="text-gray-500 text-xs">Date: {item.date}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-5 py-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row gap-2 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={26} color="black" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-800">Bonafide Request</Text>
                </View>
            </View>

            {/* Form */}
            <View className="mb-8">
                {/* Type */}
                <Text className="text-sm font-medium text-gray-700 mb-1">Type of Bonafide</Text>
                <View className="bg-gray-100 rounded-lg mb-4">
                    <Picker
                        selectedValue={bonafideType}
                        onValueChange={(itemValue) => setBonafideType(itemValue)}
                    >
                        <Picker.Item label="General" value="General" />
                        <Picker.Item label="Address Proof" value="Address" />
                        <Picker.Item label="Scholarship" value="Scholarship" />
                        <Picker.Item label="Passport" value="Passport" />
                    </Picker>
                </View>

                {/* Purpose */}
                <Text className="text-sm font-medium text-gray-700 mb-1">Purpose</Text>
                <TextInput
                    placeholder="Eg. Scholarship, Hostel, Visa..."
                    className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-800"
                    value={purpose}
                    onChangeText={setPurpose}
                />

                {/* Description */}
                <Text className="text-sm font-medium text-gray-700 mb-1">Additional Details</Text>
                <TextInput
                    placeholder="Any other information..."
                    className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-800"
                    multiline
                    numberOfLines={3}
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Submit */}
                <TouchableOpacity
                    className="bg-indigo-600 p-4 mt-2 rounded-lg items-center"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-bold text-lg">Submit Request</Text>
                </TouchableOpacity>
            </View>

            {/* History Section */}
            <View className="border-t border-gray-200 pt-4">
                <Text className="text-lg font-semibold text-gray-800 mb-3">Previous Requests</Text>
                {history.length === 0 ? (
                    <Text className="text-gray-500">No past requests.</Text>
                ) : (
                    <FlatList
                        data={history}
                        renderItem={renderHistoryItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
