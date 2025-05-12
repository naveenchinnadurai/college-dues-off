import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { Book, Users, ChevronRight, Calendar, BarChart3 } from "lucide-react-native"

const subjects = [
  { id: "1", code: "CS101", name: "Introduction to Programming", students: 45, pendingMarks: true },
  { id: "2", code: "CS202", name: "Data Structures", students: 38, pendingMarks: false },
  { id: "3", code: "CS303", name: "Database Management", students: 42, pendingMarks: true },
]

const advisorFor = {
  id: "1",
  name: "CS-3A",
  students: 50,
  attendance: 92
}

export default function StaffDashboardScreen() {
  const router = useRouter()

  const navigateToSubjectMarks = (subjectId: string, subjectName: string) => {
    router.push({ pathname: "/(screens)/staff/dashboard/internalMarks", params: { subjectId, subjectName } })
  }

  const navigateToClassAttendance = (classId: string, className: string) => {
    router.push({ pathname: "/(screens)/staff/dashboard/attendance", params: { classId, className } })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="px-4 pt-12 pb-4 bg-indigo-600">
        <Text className="text-2xl font-bold text-white">Staff Dashboard</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold text-gray-800">Your Subjects</Text>
          <TouchableOpacity className="py-1">
            <Text className="text-indigo-600 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            className={`mb-3 p-4 rounded-xl border ${subject.pendingMarks ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"
              }`}
            onPress={() => navigateToSubjectMarks(subject.id, subject.name)}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center">
                  <Book size={20} color="#4f46e5" />
                </View>
                <View className="ml-3">
                  <Text className="font-semibold text-gray-800">{subject.name}</Text>
                  <Text className="text-gray-500 text-sm">{subject.code}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#6b7280" />
            </View>
            <View className="flex-row justify-between mt-3">
              <View className="flex-row items-center">
                <Users size={16} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">{subject.students} students</Text>
              </View>
              {subject.pendingMarks && (
                <View className="px-2 py-1 bg-amber-100 rounded-md">
                  <Text className="text-amber-800 text-xs font-medium">Marks Pending</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {advisorFor && (
          <>
            <View className="flex-row justify-between items-center mt-6 mb-4">
              <Text className="text-xl font-semibold text-gray-800">Class Advisor</Text>
              <TouchableOpacity className="py-1">
                <Text className="text-indigo-600 font-medium">View All</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mb-3 p-4 rounded-xl border border-gray-200 bg-gray-50"
              onPress={() => navigateToClassAttendance(advisorFor.id, advisorFor.name)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
                    <Users size={20} color="#10b981" />
                  </View>
                  <View className="ml-3">
                    <Text className="font-semibold text-gray-800">{advisorFor.name}</Text>
                    <Text className="text-gray-500 text-sm">{advisorFor.students} students</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#6b7280" />
              </View>
              <View className="flex-row justify-between mt-3">
                <View className="flex-row items-center">
                  <Calendar size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm ml-1">Today's Attendance</Text>
                </View>
                <View className="px-2 py-1 bg-green-100 rounded-md">
                  <Text className="text-green-800 text-xs font-medium">{advisorFor.attendance}% Present</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        <View className="mt-6 mb-4">
          <Text className="text-xl font-semibold text-gray-800">Quick Stats</Text>
          <View className="flex-row mt-3 mb-6">
            <View className="flex-1 p-4 bg-purple-50 rounded-xl mr-2">
              <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mb-2">
                <BarChart3 size={20} color="#7c3aed" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">87%</Text>
              <Text className="text-gray-600 text-sm">Average Marks</Text>
            </View>
            <View className="flex-1 p-4 bg-blue-50 rounded-xl ml-2">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mb-2">
                <Calendar size={20} color="#2563eb" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">92%</Text>
              <Text className="text-gray-600 text-sm">Attendance Rate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
