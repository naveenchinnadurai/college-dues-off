import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUser } from '@/context/userContext';

export default function BonafideRequest() {
    const { router } = useUser();

    const [newRequest, setNewRequest] = useState({
        type: 'General',
        purpose: '',
        description: '',
    });

    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);

    const [history, setHistory] = useState([
        {
            id: '1',
            type: 'Scholarship',
            purpose: 'To apply for government scholarship',
            description: '',
            status: 'Approved',
            date: '2024-09-01',
        },
        {
            id: '2',
            type: 'Passport',
            purpose: 'Address verification for passport',
            description: '',
            status: 'Pending',
            date: '2024-10-15',
        },
    ]);

    const filteredHistory = history.filter((item) => {
        if (filter === 'All') return true;
        return item.status === filter;
    });

    const handleSubmit = () => {
        if (!newRequest.purpose.trim()) {
            Alert.alert('Missing Info', 'Please enter a valid purpose.');
            return;
        }

        const entry = {
            id: String(history.length + 1),
            ...newRequest,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };

        setHistory([entry, ...history]);
        setShowModal(false);
        setNewRequest({ type: 'General', purpose: '', description: '' });
    };

    const renderHistoryItem = ({ item }: { item: any }) => (
        <View className="bg-white border border-gray-200 p-4 mb-3 rounded-lg shadow-sm">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-base font-semibold text-indigo-800">{item.type}</Text>
                <Text
                    className={`text-xs px-2 py-1 rounded-full ${item.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                >
                    {item.status}
                </Text>
            </View>
            <Text className="text-sm text-gray-700 mb-0.5">Purpose: {item.purpose}</Text>
            {item.description ? <Text className="text-sm text-gray-600 mb-0.5">Details: {item.description}</Text> : null}
            <Text className="text-xs text-gray-500">Date: {item.date}</Text>
        </View>
    );

    return (
        <SafeAreaView className="relative flex-1 bg-white px-5 py-6">
            <TouchableOpacity
                onPress={() => setShowModal(true)}
                className="absolute bottom-6 right-6 bg-indigo-600 rounded-full p-4 shadow-lg"
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row gap-2 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={26} color="black" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold flex-row items-center h-6">Bonafide Request</Text>
                </View>
            </View>

            {/* Filter Buttons */}
            <View className="flex-row gap-2 mb-4">
                {['All', 'Pending', 'Approved', 'Rejected'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => setFilter(type)}
                        className={`px-3 py-1.5 rounded-full border ${filter === type ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}
                    >
                        <Text className={`text-sm font-medium ${filter === type ? 'text-white' : 'text-gray-700'}`}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* History Section */}
            <View className="border-t border-gray-200 pt-4">
                <Text className="text-lg font-semibold text-gray-800 mb-3">Request History</Text>
                {filteredHistory.length === 0 ? (
                    <Text className="text-gray-500">No past requests for "{filter}".</Text>
                ) : (
                    <FlatList
                        data={filteredHistory}
                        renderItem={renderHistoryItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    />
                )}
            </View>

            {/* Modal Form */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/30">
                    <View className="bg-white w-[90%] rounded-xl p-5">
                        <Text className="text-lg font-bold text-gray-800 mb-4">New Bonafide Request</Text>

                        <Text className="text-sm font-medium text-gray-700 mb-1">Type</Text>
                        <View className="bg-gray-100 rounded-lg mb-4">
                            <Picker
                                selectedValue={newRequest.type}
                                onValueChange={(itemValue) => setNewRequest({ ...newRequest, type: itemValue })}
                            >
                                <Picker.Item label="General" value="General" />
                                <Picker.Item label="Address Proof" value="Address" />
                                <Picker.Item label="Scholarship" value="Scholarship" />
                                <Picker.Item label="Passport" value="Passport" />
                            </Picker>
                        </View>

                        <Text className="text-sm font-medium text-gray-700 mb-1">Purpose</Text>
                        <TextInput
                            placeholder="Eg. Scholarship, Hostel, Visa..."
                            className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-800"
                            value={newRequest.purpose}
                            onChangeText={(text) => setNewRequest({ ...newRequest, purpose: text })}
                        />

                        <Text className="text-sm font-medium text-gray-700 mb-1">Description</Text>
                        <TextInput
                            placeholder="Additional information..."
                            className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-800"
                            multiline
                            numberOfLines={3}
                            value={newRequest.description}
                            onChangeText={(text) => setNewRequest({ ...newRequest, description: text })}
                        />

                        <View className="flex-row justify-end gap-2">
                            <TouchableOpacity onPress={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">
                                <Text className="text-gray-600 font-medium">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} className="px-4 py-2 rounded-lg bg-indigo-600">
                                <Text className="text-white font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}