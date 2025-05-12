import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter, useLocalSearchParams } from "expo-router"
import { ArrowLeft, Save, Filter, Search } from "lucide-react-native"
import Header from "@/component/header"

// Updated mock data with internal3
const students = [
    {
        id: "1",
        name: "Alex Johnson",
        regNo: "CS2021001",
        photo: "https://i.pravatar.cc/150?img=1",
        marks: { internal1: 18, internal2: 16, internal3: 17, assignment: 9 },
    },
    {
        id: "2",
        name: "Emma Williams",
        regNo: "CS2021002",
        photo: "https://i.pravatar.cc/150?img=2",
        marks: { internal1: 15, internal2: 17, internal3: 16, assignment: 8 },
    },
    {
        id: "3",
        name: "Michael Brown",
        regNo: "CS2021003",
        photo: "https://i.pravatar.cc/150?img=3",
        marks: { internal1: 19, internal2: 18, internal3: 19, assignment: 10 },
    },
    {
        id: "4",
        name: "Sophia Davis",
        regNo: "CS2021004",
        photo: "https://i.pravatar.cc/150?img=4",
        marks: { internal1: 14, internal2: 15, internal3: 13, assignment: 7 },
    },
    {
        id: "5",
        name: "James Wilson",
        regNo: "CS2021005",
        photo: "https://i.pravatar.cc/150?img=5",
        marks: { internal1: 17, internal2: 16, internal3: 18, assignment: 9 },
    },
    {
        id: "6",
        name: "Olivia Taylor",
        regNo: "CS2021006",
        photo: "https://i.pravatar.cc/150?img=6",
        marks: { internal1: 16, internal2: 14, internal3: 15, assignment: 8 },
    },
    {
        id: "7",
        name: "William Anderson",
        regNo: "CS2021007",
        photo: "https://i.pravatar.cc/150?img=7",
        marks: { internal1: 18, internal2: 17, internal3: 19, assignment: 9 },
    },
    {
        id: "8",
        name: "Ava Thomas",
        regNo: "CS2021008",
        photo: "https://i.pravatar.cc/150?img=8",
        marks: { internal1: 15, internal2: 16, internal3: 15, assignment: 8 },
    },
]

export default function SubjectMarks() {
    const router = useRouter()
    const { subjectId, subjectName } = useLocalSearchParams<{ subjectId: string; subjectName: string }>()

    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState<"internal1" | "internal2" | "internal3" | "assignment">("internal1")
    const [studentsData, setStudentsData] = useState(students)

    const filteredStudents = studentsData.filter(
        (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.regNo.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleMarkChange = (studentId: string, value: string) => {
        const numValue = parseInt(value) || 0
        const maxValue = activeTab === "assignment" ? 10 : 20
        const validValue = Math.min(Math.max(0, numValue), maxValue)

        setStudentsData((prev) =>
            prev.map((student) =>
                student.id === studentId
                    ? {
                        ...student,
                        marks: {
                            ...student.marks,
                            [activeTab]: validValue,
                        },
                    }
                    : student,
            ),
        )
    }

    const saveMarks = () => {
        alert("Marks saved successfully!")
        console.log(studentsData)
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar />
            <View className="px-4 pt-10 bg-indigo-600">
                <Header className='flex-row !justify-start' iconStyle={{ color: 'white' }}>
                    <View className="ml-10">
                        <Text className="text-2xl font-bold text-white">{subjectName}</Text>
                        <Text className="text-white opacity-80 mt-1">Internal Assessment Marks</Text>
                    </View>
                </Header>
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

            <View className="flex-row border-b border-gray-200">
                {
                    ["internal1", "internal2", "internal3", "assignment"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            className={`flex-1 py-3 ${activeTab === tab ? "border-b-2 border-indigo-600" : ""}`}
                            onPress={() => setActiveTab(tab as any)}
                        >
                            <Text className={`text-center font-medium ${activeTab === tab ? "text-indigo-600" : "text-gray-600"}`}>
                                {
                                    tab === "internal1"
                                        ? "Internal 1"
                                        : tab === "internal2"
                                            ? "Internal 2"
                                            : tab === "internal3"
                                                ? "Internal 3"
                                                : "Assignment"
                                }
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="flex-row justify-between items-center mb-3 px-2">
                        <Text className="text-gray-500 font-medium w-36">Students</Text>
                        <Text className="text-gray-500 font-medium text-center"> Marks(50) </Text>
                    </View>

                    {
                        filteredStudents.map((student) => (
                            <View
                                key={student.id}
                                className="flex-row items-center justify-between py-3 px-2 border-b border-gray-100"
                            >
                                <View className="flex-row items-center w-36">
                                    <View className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <Text className="text-center leading-10">{student.name.charAt(0)}</Text>
                                    </View>
                                    <View className="ml-2 flex-1">
                                        <Text className="font-medium text-gray-800" numberOfLines={1}>
                                            {student.name}
                                        </Text>
                                        <Text className="text-gray-500 text-xs">{student.regNo}</Text>
                                    </View>
                                </View>

                                <View className="items-center">
                                    <TextInput
                                        className="bg-gray-100 rounded-lg px-3 py-2 w-16 text-center"
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        value={student.marks[activeTab].toString()}
                                        onChangeText={(value) => handleMarkChange(student.id, value)}
                                    />
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

            <View className="p-4 border-t border-gray-200">
                <TouchableOpacity
                    className="bg-indigo-600 py-3 rounded-lg flex-row justify-center items-center"
                    onPress={saveMarks}
                >
                    <Save size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Save Marks</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
