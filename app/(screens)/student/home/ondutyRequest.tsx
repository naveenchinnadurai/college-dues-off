import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Modal, Pressable, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUser } from '@/context/userContext';

interface OnDutyRequestItem {
    id: string;
    reason: string;
    startDate: string;
    endDate: string;
    docLink: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    message: string;
}

const OnDutyRequest = () => {
    const { router } = useUser();

    const [newRequest, setNewRequest] = useState<OnDutyRequestItem>({
        id: '',
        reason: '',
        docLink: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        message: '',
    });

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

    const [history, setHistory] = useState<OnDutyRequestItem[]>([
        {
            id: '1',
            reason: 'Sports Meet – Representing college at District Level',
            startDate: '2024-08-10',
            endDate: '2024-08-12',
            docLink: 'https://drive.google.com/doc1',
            status: 'Approved',
            message: 'Approved by HOD. Best of luck for the event!'
        },
        {
            id: '2',
            reason: 'Tech Expo Participation',
            startDate: '2024-09-05',
            endDate: '2024-09-06',
            docLink: '',
            status: 'Pending',
            message: ''
        },
    ]);

    const filteredHistory = history.filter((item) => {
        if (filter === 'All') return true;
        return item.status === filter;
    });

    const handleSubmit = () => {
        if (!newRequest.reason.trim()) {
            Alert.alert('Missing Info', 'Please enter a reason for On-Duty.');
            return;
        }

        const request: OnDutyRequestItem = {
            ...newRequest,
            id: String(history.length + 1),
            startDate: newRequest.startDate,
            endDate: newRequest.endDate,
            status: 'Pending',
            message: '',
        };

        setHistory([request, ...history]);

        setNewRequest({
            id: '',
            reason: '',
            docLink: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            message: '',
        });
        setModalVisible(false);
        Alert.alert('Request Sent', 'Your On-Duty request has been submitted.');
    };

    const renderItem = ({ item }: { item: OnDutyRequestItem }) => (
        <View className="border-l-[5px] border-indigo-600 bg-gray-50 p-4 mb-3 rounded-xl shadow-md">
            <Text className="font-semibold text-base text-gray-800 mb-1">{item.reason}</Text>
            <Text className="text-sm text-gray-600 mb-0.5">
                🗓️ {item.startDate} → {item.endDate}
            </Text>
            {item.docLink ? (
                <Text className="text-sm text-blue-600 underline mb-1">{item.docLink}</Text>
            ) : null}
            <Text
                className={`text-xs px-3 py-1 rounded-full self-start font-semibold tracking-wide ${item.status === 'Approved'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : item.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
            >
                {item.status}
            </Text>
            {(item.status === 'Approved' || item.status === 'Rejected') && item.message ? (
                <Text className="mt-2 text-sm text-gray-700 italic bg-gray-100 p-2 rounded-md">
                    💬 {item.message}
                </Text>
            ) : null}
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-5 py-6">
            <View className="flex-row items-center mb-4 gap-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={26} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800">On-Duty Requests</Text>
            </View>

            <View className="flex-row gap-2 mb-3">
                {['All', 'Pending', 'Approved', 'Rejected'].map((type: any) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => setFilter(type)}
                        className={`px-3 py-1.5 rounded-full border ${filter === type ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                            }`}
                    >
                        <Text className={`text-sm font-medium ${filter === type ? 'text-white' : 'text-gray-700'}`}>
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {filteredHistory.length === 0 ? (
                <Text className="text-gray-500">No On-Duty requests found for "{filter}".</Text>
            ) : (
                <FlatList
                    data={filteredHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="absolute bottom-6 right-6 bg-indigo-600 rounded-full p-4 shadow-lg"
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View className="flex-1 justify-center items-center bg-black/40 bg-opacity-40 px-4">
                    <View className="bg-white w-full rounded-xl p-5">
                        <Text className="text-xl font-bold mb-3 text-gray-800">New On-Duty Request</Text>

                        <Text className="text-sm font-medium text-gray-700 mb-1">Reason</Text>
                        <TextInput
                            placeholder="Eg. Sports Event, Tech Fest..."
                            placeholderTextColor="#888"
                            className="bg-gray-100 px-4 pt-3 pb-2 rounded-lg mb-3 text-gray-800"
                            multiline
                            value={newRequest.reason}
                            onChangeText={(text) => setNewRequest({ ...newRequest, reason: text })}
                        />

                        <Text className="text-sm font-medium text-gray-700 mb-1">Proof Document Link</Text>
                        <TextInput
                            placeholder="https://drive.google.com/..."
                            placeholderTextColor="#888"
                            className="bg-gray-100 px-4 py-3 rounded-lg mb-3 text-gray-800"
                            value={newRequest.docLink}
                            onChangeText={(text) => setNewRequest({ ...newRequest, docLink: text })}
                        />

                        <View className="flex-row gap-2">
                            <View className="w-1/2">
                                <Text className="text-sm font-medium text-gray-700 mb-1">From Date</Text>
                                <TouchableOpacity
                                    className="bg-gray-100 p-2.5 rounded-lg mb-3"
                                    onPress={() => setShowFromPicker(true)}
                                >
                                    <Text className="text-gray-800">{newRequest.startDate}</Text>
                                </TouchableOpacity>
                                {showFromPicker && (
                                    <DateTimePicker
                                        value={new Date(newRequest.startDate)}
                                        mode="date"
                                        display="default"
                                        onChange={(event, date) => {
                                            setShowFromPicker(false);
                                            if (date) setNewRequest({ ...newRequest, startDate: date.toISOString().split('T')[0] });
                                        }}
                                    />
                                )}
                            </View>

                            <View className="w-1/2">
                                <Text className="text-sm font-medium text-gray-700 mb-1">To Date</Text>
                                <TouchableOpacity
                                    className="bg-gray-100 p-2.5 rounded-lg mb-3"
                                    onPress={() => setShowToPicker(true)}
                                >
                                    <Text className="text-gray-800">{newRequest.endDate}</Text>
                                </TouchableOpacity>
                                {showToPicker && (
                                    <DateTimePicker
                                        value={new Date(newRequest.endDate)}
                                        mode="date"
                                        display="default"
                                        onChange={(event, date) => {
                                            setShowToPicker(false);
                                            if (date) setNewRequest({ ...newRequest, endDate: date.toISOString().split('T')[0] });
                                        }}
                                    />
                                )}
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-4">
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                <Text className="text-gray-800 font-semibold">Cancel</Text>
                            </Pressable>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-indigo-600 px-6 py-2 rounded-lg"
                            >
                                <Text className="text-white font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default OnDutyRequest;
