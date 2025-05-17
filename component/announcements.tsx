import { useUser } from '@/context/userContext'
import API from '@/utils/api'
import { getTimeDifference } from '@/utils/helpers'
import { Clock, Plus } from "lucide-react-native"
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

interface Announcement {
    id: number
    title: string
    content: string
    created_on: string
}

const Announcements = () => {

    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", content: "" });

    // Mock data for announcements
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        {
            id:1,
            title: "Holiday Notice",
            content: "The college will be closed on 30th June for Summer.",
            created_on: "2023-12-01T10:00:00Z"
        },
        {
            id:2,
            title: "Event Notice",
            content: "The annual sports day will be held on 25th May.",
            created_on: "2023-12-02T12:00:00Z"
        },
    ])

    const fetchAnnouncements = async () => {
        // Fetch announcements from the server
        try {
            const response = await API.get('/profile/announcement')
            console.log(response.data);
            if (response.status === 200) {
                setAnnouncements(response.data);
                return;
            }
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAnnouncements();
    }, [])

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            Alert.alert("Error", "Please fill in both fields.");
            return;
        }

        console.log(formData)
        try {
            const response = await API.post('/staff/b08b42fa-b2dc-445d-8b32-c18f7855a196/announcement', {
                title: formData.title,
                content: formData.content,
            });

            console.log(response)

            if (response.status == 201) {
                Alert.alert("Success", "Announcement created successfully.");
                setFormData({ title: "", content: "" });
                fetchAnnouncements();
                setShowModal(false);
            } else {
                Alert.alert("Error", "Failed to create announcement.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An error occurred while creating the announcement.");
        }
    };

    return (
        <View className="mb-6" >
            {
                user?.type == 'staff' && (
                    <View className="flex-row justify-between items-center py-3">
                        <Text className="text-xl font-semibold text-gray-800">College Announcements</Text>
                        <TouchableOpacity
                            onPress={() => setShowModal(true)}
                            className="bg-slate-400 p-2 rounded-full shadow-md"
                        >
                            <Plus color='white' size={20} />
                        </TouchableOpacity>
                    </View>
                )
            }
            <View className='flex-row gap-2 items-center py-2 '>
                <Text className="text-lg font-semibold text-gray-800">Announcements</Text>
                <TouchableOpacity onPressIn={fetchAnnouncements} className="">
                    <EvilIcons name='refresh' size={24} />
                </TouchableOpacity>
            </View>
            {
                announcements ? (
                    announcements.map((announcement) => (
                        <View key={announcement.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
                            <Text className="font-medium text-gray-800">{announcement.title}</Text>
                            <Text className="text-gray-600 text-sm mt-1">{announcement.content}</Text>
                            <View className="flex-row items-center mt-2">
                                <Clock size={14} color="#6b7280" />
                                <Text className="text-gray-500 text-xs ml-1">{getTimeDifference(new Date(announcement.created_on))}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text className="text-gray-500 text-sm text-center">No announcements available.</Text>
                )
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/30">
                    <View className="bg-white w-[90%] rounded-xl p-5 h-fit">
                        <Text className="text-2xl font-bold mb-6">Create Announcement</Text>

                        <Text className="text-gray-700 mb-2">Title</Text>
                        <TextInput
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                            placeholder="Enter title"
                            className="border border-gray-300 rounded-lg p-3 mb-4"
                        />
                        <Text className="text-gray-700 mb-2">Message</Text>
                        <TextInput
                            value={formData.content}
                            onChangeText={(text) => setFormData({ ...formData, content: text })}
                            placeholder="Enter content"
                            multiline
                            numberOfLines={6}
                            className="border border-gray-300 rounded-lg p-3 mb-6 h-40"
                        />


                        <View className='flex-row justify-between gap-2'>
                            <TouchableOpacity
                                onPress={() => setShowModal(false)}
                                className="bg-white-600 border border-indigo-600 p-3 rounded-lg items-center w-1/2"
                            >
                                <Text className="text-indigo-600 font-semibold">cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-indigo-600 p-3 rounded-lg items-center w-1/2"
                            >
                                <Text className="text-white font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

export default Announcements