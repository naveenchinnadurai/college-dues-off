"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter, useLocalSearchParams } from "expo-router"
import { ArrowLeft, Save, Filter, Search, Calendar, CheckCircle, XCircle } from "lucide-react-native"
import Header from "@/component/header"

const students = [
    { id: "1", name: "Alex Johnson", regNo: "CS2021001", photo: "https://i.pravatar.cc/150?img=1", present: true },
    { id: "2", name: "Emma Williams", regNo: "CS2021002", photo: "https://i.pravatar.cc/150?img=2", present: true },
    { id: "3", name: "Michael Brown", regNo: "CS2021003", photo: "https://i.pravatar.cc/150?img=3", present: false },
    { id: "4", name: "Sophia Davis", regNo: "CS2021004", photo: "https://i.pravatar.cc/150?img=4", present: true },
    { id: "5", name: "James Wilson", regNo: "CS2021005", photo: "https://i.pravatar.cc/150?img=5", present: true },
    { id: "6", name: "Olivia Taylor", regNo: "CS2021006", photo: "https://i.pravatar.cc/150?img=6", present: false },
    { id: "7", name: "William Anderson", regNo: "CS2021007", photo: "https://i.pravatar.cc/150?img=7", present: true },
    { id: "8", name: "Ava Thomas", regNo: "CS2021008", photo: "https://i.pravatar.cc/150?img=8", present: true },
]

export default function ClassAttendanceScreen() {
    const router = useRouter()
    const { classId, className } = useLocalSearchParams()

    const [searchQuery, setSearchQuery] = useState("")
    const [studentsData, setStudentsData] = useState(students)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const filteredStudents = studentsData.filter(
        (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.regNo.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const toggleAttendance = (studentId: string) => {
        setStudentsData((prev) =>
            prev.map((student) => (student.id === studentId ? { ...student, present: !student.present } : student)),
        )
    }

    const saveAttendance = () => {
        alert("Attendance saved successfully!")
    }

    const presentCount = studentsData.filter((student) => student.present).length
    const attendancePercentage = Math.round((presentCount / studentsData.length) * 100)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="px-4 pt-12 pb-4 bg-green-600">
                <Header className='flex-row !justify-start' iconStyle={{ color: 'white' }}>
                    <View className="ml-10">
                        <Text className="text-2xl font-bold text-white">{className}</Text>
                        <Text className="text-white opacity-80 mt-1">Attendance Management</Text>
                    </View>
                </Header>
            </View>

            <View className="p-4 bg-green-50 border-b border-green-100">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Calendar size={20} color="#059669" />
                        <Text className="ml-2 font-medium text-gray-800">{formatDate(selectedDate)}</Text>
                    </View>
                    <TouchableOpacity className="bg-white px-3 py-1 rounded-full border border-green-200">
                        <Text className="text-green-700">Change Date</Text> shadow-md
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mt-3 gap-2 rounded-lg">
                    <View className="bg-white px-3 py-2 shadow-md">
                        <Text className="text-gray-500">Total Students</Text>
                        <Text className="text-xl font-bold text-gray-800">{studentsData.length}</Text>
                    </View>
                    <View className="bg-white px-3 py-2 shadow-md">
                        <Text className="text-gray-500">Present</Text>
                        <Text className="text-xl font-bold text-green-600">{presentCount}</Text>
                    </View>
                    <View className="bg-white px-3 py-2 shadow-md">
                        <Text className="text-gray-500">Absent</Text>
                        <Text className="text-xl font-bold text-red-600">{studentsData.length - presentCount}</Text>
                    </View>
                    <View className="bg-white px-3 py-2 shadow-md">
                        <Text className="text-gray-500">Percentage</Text>
                        <Text className="text-xl font-bold text-blue-600">{attendancePercentage}%</Text>
                    </View>
                </View>
            </View>

            <View className="px-4 py-3 border-b border-gray-200">
                <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search size={18} color="#6b7280" />
                    <TextInput
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="Search by name or reg no"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity>
                        <Filter size={18} color="#6b7280" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="flex-row justify-between items-center mb-3 px-2">
                        <Text className="text-gray-500 font-medium flex-1">Student</Text>
                        <Text className="text-gray-500 font-medium w-20 text-center">Status</Text>
                    </View>

                    {filteredStudents.map((student) => (
                        <TouchableOpacity
                            key={student.id}
                            className="flex-row items-center justify-between py-3 px-2 border-b border-gray-100"
                            onPress={() => toggleAttendance(student.id)}
                        >
                            <View className="flex-row items-center flex-1">
                                <Image
                                    source={{ uri: student.photo }}
                                    className="w-10 h-10 rounded-full bg-gray-200"
                                />
                                <View className="ml-2">
                                    <Text className="font-medium text-gray-800">{student.name}</Text>
                                    <Text className="text-gray-500 text-xs">{student.regNo}</Text>
                                </View>
                            </View>

                            <View className="w-20 items-center">
                                {student.present ? (
                                    <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
                                        <CheckCircle size={16} color="#059669" />
                                        <Text className="text-green-700 ml-1 text-sm">Present</Text>
                                    </View>
                                ) : (
                                    <View className="bg-red-100 px-2 py-1 rounded-full flex-row items-center">
                                        <XCircle size={16} color="#dc2626" />
                                        <Text className="text-red-700 ml-1 text-sm">Absent</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View className="p-4 border-t border-gray-200">
                <TouchableOpacity
                    className="bg-green-600 py-3 rounded-lg flex-row justify-center items-center"
                    onPress={saveAttendance}
                >
                    <Save size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Save Attendance</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
