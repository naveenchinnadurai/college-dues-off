import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Info, CheckCircle, Clock, XCircle, Send } from "lucide-react-native"
import { useUser } from "@/context/userContext"

// Define the subject type
interface Subject {
    id: number
    name: string
    code: string
    staff: string
    department: string
    status: "not_requested" | "pending" | "approved" | "rejected"
}

export default function NoDuesRequestScreen() {
    const { router } = useUser()

    // Mock data for subjects
    const [subjects, setSubjects] = useState<Subject[]>([
        {
            id: 1,
            name: "Database Management Systems",
            code: "CS401",
            staff: "Dr. Priya Sharma",
            department: "CSE",
            status: "not_requested",
        },
        {
            id: 2,
            name: "Computer Networks",
            code: "CS402",
            staff: "Prof. Rajesh Kumar",
            department: "CSE",
            status: "pending",
        },
        {
            id: 3,
            name: "Operating Systems",
            code: "CS403",
            staff: "Dr. Anand Verma",
            department: "CSE",
            status: "approved",
        },
        {
            id: 4,
            name: "Software Engineering",
            code: "CS404",
            staff: "Prof. Meena Gupta",
            department: "CSE",
            status: "not_requested",
        },
        {
            id: 5,
            name: "Web Technologies",
            code: "CS405",
            staff: "Dr. Suresh Patel",
            department: "CSE",
            status: "rejected",
        },
        {
            id: 6,
            name: "Machine Learning",
            code: "CS406",
            staff: "Prof. Lakshmi Narayan",
            department: "CSE",
            status: "not_requested",
        },
    ])

    // State for selected subjects
    const [selectedSubjects, setSelectedSubjects] = useState<number[]>([])

    // Toggle selection for a subject
    const toggleSubjectSelection = (subjectId: number) => {
        if (selectedSubjects.includes(subjectId)) {
            setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId))
        } else {
            setSelectedSubjects([...selectedSubjects, subjectId])
        }
    }

    // Select all subjects that are not already requested
    const selectAllSubjects = () => {
        const availableSubjects = subjects
            .filter((subject) => subject.status === "not_requested")
            .map((subject) => subject.id)
        setSelectedSubjects(availableSubjects)
    }

    // Clear all selections
    const clearSelections = () => {
        setSelectedSubjects([])
    }

    // Submit no dues request
    const submitRequest = () => {
        if (selectedSubjects.length === 0) {
            Alert.alert("No Selection", "Please select at least one subject to request No Dues.")
            return
        }

        // Update the status of selected subjects to pending
        const updatedSubjects = subjects.map((subject) => {
            if (selectedSubjects.includes(subject.id) && subject.status === "not_requested") {
                return { ...subject, status: "pending" }
            }
            return subject
        })

        // setSubjects(updatedSubjects)
        setSelectedSubjects([])

        Alert.alert(
            "Request Submitted",
            "Your No Dues request has been submitted successfully. You can check the status in the requests section.",
            [{ text: "OK" }],
        )
    }

    // Get status badge for a subject
    const getStatusBadge = (status: Subject["status"]) => {
        switch (status) {
            case "pending":
                return (
                    <View className="flex-row items-center bg-amber-100 px-2 py-1 rounded-full">
                        <Clock size={14} color="#b45309" />
                        <Text className="text-amber-700 text-xs font-medium ml-1">Pending</Text>
                    </View>
                )
            case "approved":
                return (
                    <View className="flex-row items-center bg-green-100 px-2 py-1 rounded-full">
                        <CheckCircle size={14} color="#15803d" />
                        <Text className="text-green-700 text-xs font-medium ml-1">Approved</Text>
                    </View>
                )
            case "rejected":
                return (
                    <View className="flex-row items-center bg-red-100 px-2 py-1 rounded-full">
                        <XCircle size={14} color="#b91c1c" />
                        <Text className="text-red-700 text-xs font-medium ml-1">Rejected</Text>
                    </View>
                )
            default:
                return null
        }
    }

    // Count subjects by status
    const pendingCount = subjects.filter((s) => s.status === "pending").length
    const approvedCount = subjects.filter((s) => s.status === "approved").length
    const rejectedCount = subjects.filter((s) => s.status === "rejected").length
    const notRequestedCount = subjects.filter((s) => s.status === "not_requested").length

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()} className="mb-2">
                    <ArrowLeft size={24} color="#4b5563" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800">No Dues Request</Text>
            </View>

            <ScrollView className="flex-1 px-4 pt-4">
                {/* Info Card */}
                <View className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
                    <View className="flex-row items-start">
                        <Info size={20} color="#3b82f6" className="mt-0.5" />
                        <View className="ml-3 flex-1">
                            <Text className="font-semibold text-blue-800 mb-1">What is No Dues?</Text>
                            <Text className="text-blue-700 text-sm">
                                No Dues certificate confirms you have no pending fees, library books, or lab equipment. It's required
                                for exam registration, degree certificate, and other official documents.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Status Summary */}
                <View className="flex-row justify-between mb-6">
                    <View className="bg-white p-3 rounded-xl shadow-sm w-[23%] items-center">
                        <Text className="text-lg font-bold text-amber-600">{pendingCount}</Text>
                        <Text className="text-xs text-gray-500">Pending</Text>
                    </View>
                    <View className="bg-white p-3 rounded-xl shadow-sm w-[23%] items-center">
                        <Text className="text-lg font-bold text-green-600">{approvedCount}</Text>
                        <Text className="text-xs text-gray-500">Approved</Text>
                    </View>
                    <View className="bg-white p-3 rounded-xl shadow-sm w-[23%] items-center">
                        <Text className="text-lg font-bold text-red-600">{rejectedCount}</Text>
                        <Text className="text-xs text-gray-500">Rejected</Text>
                    </View>
                    <View className="bg-white p-3 rounded-xl shadow-sm w-[23%] items-center">
                        <Text className="text-lg font-bold text-gray-600">{notRequestedCount}</Text>
                        <Text className="text-xs text-gray-500">Pending</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row justify-between mb-4">
                    <TouchableOpacity
                        className="bg-blue-600 px-4 py-2 rounded-lg flex-row items-center"
                        onPress={selectAllSubjects}
                    >
                        <Text className="text-white font-medium">Select All Available</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-gray-200 px-4 py-2 rounded-lg flex-row items-center"
                        onPress={clearSelections}
                    >
                        <Text className="text-gray-700 font-medium">Clear Selection</Text>
                    </TouchableOpacity>
                </View>

                {/* Subjects List */}
                <Text className="text-lg font-semibold text-gray-800 mb-3">Your Subjects</Text>

                {subjects.map((subject) => (
                    <View
                        key={subject.id}
                        className={`bg-white p-4 rounded-xl mb-3 border ${selectedSubjects.includes(subject.id) ? "border-blue-300" : "border-gray-100"
                            } ${selectedSubjects.includes(subject.id) ? "bg-blue-50" : "bg-white"}`}
                    >
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <View className="flex-row items-center mb-1">
                                    <Text className="text-gray-500 text-xs">{subject.code}</Text>
                                    <Text className="text-gray-400 mx-1">•</Text>
                                    <Text className="text-gray-500 text-xs">{subject.department}</Text>
                                </View>
                                <Text className="font-semibold text-gray-800 mb-1">{subject.name}</Text>
                                <Text className="text-gray-600 text-sm">Staff: {subject.staff}</Text>
                            </View>

                            {getStatusBadge(subject.status)}
                        </View>

                        {subject.status === "not_requested" && (
                            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                <Text className="text-gray-700">Select for No Dues</Text>
                                <Switch
                                    value={selectedSubjects.includes(subject.id)}
                                    onValueChange={() => toggleSubjectSelection(subject.id)}
                                    trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                                    thumbColor={selectedSubjects.includes(subject.id) ? "#3b82f6" : "#f3f4f6"}
                                />
                            </View>
                        )}
                    </View>
                ))}

                <View className="h-20" />
            </ScrollView>

            {/* Submit Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200">
                <TouchableOpacity
                    className={`py-3 rounded-lg flex-row justify-center items-center ${selectedSubjects.length > 0 ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    onPress={submitRequest}
                    disabled={selectedSubjects.length === 0}
                >
                    <Send size={18} color={selectedSubjects.length > 0 ? "white" : "#9ca3af"} />
                    <Text className={`ml-2 font-semibold ${selectedSubjects.length > 0 ? "text-white" : "text-gray-500"}`}>
                        Submit Request{selectedSubjects.length > 0 ? ` (${selectedSubjects.length})` : ""}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
