"use client"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import Header from "@/component/profileHeader"
import StoryCard from "@/component/storyCard"
import { useUser } from "@/context/userContext"
import { Calendar, BookOpen, Bell, Clock, ChevronRight, BarChart3 } from "lucide-react-native"
import Announcements from "@/component/announcements"

const StudentHomeScreen = () => {
  const { router, subjects, user } = useUser()

  // Mock data for subjects
  const studentSubjects = [
    { id: 1, code: "CS401", name: "Database Management Systems", progress: 85, grade: "A" },
    { id: 2, code: "CS402", name: "Computer Networks", progress: 72, grade: "B+" },
    { id: 3, code: "CS403", name: "Operating Systems", progress: 90, grade: "A+" },
    { id: 4, code: "CS404", name: "Software Engineering", progress: 68, grade: "B" },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, title: "Database Mid-Term Exam", date: "May 20, 2025", type: "exam" },
    { id: 2, title: "Networks Assignment Due", date: "May 15, 2025", type: "assignment" },
    { id: 3, title: "Project Presentation", date: "May 25, 2025", type: "presentation" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white pt-4 pb-6 rounded-b-3xl shadow-sm">
          {/* Profile Header */}
          <View className="px-3">
            <Header />
          </View>

          {/* College Updates */}
          <Text className="text-lg font-semibold text-gray-800 px-3 my-3">College Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3 px-2">
            {
              user?.type == 'staff' && (
                <View className="w-[120px] h-52 bg-gray-100 justify-center items-center rounded-xl mr-3 border border-gray-200">
                  <View className="w-12 h-12 rounded-full bg-white items-center justify-center mb-2">
                    <Text className="text-3xl text-gray-400">+</Text>
                  </View>
                  <Text className="text-sm text-gray-500 text-center px-2">View Your Stories</Text>
                </View>
              )
            }
            {
              [1, 2, 3, 4, 5].map((e, i) => (
                <StoryCard index={i} key={i} />
              ))
            }
          </ScrollView>
          {/* Student Stats Dashboard */}
          <View className="flex-row justify-between mt-6 mb-2 px-3">
            <View className="w-[48%] bg-blue-50 p-4 rounded-xl">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mb-2">
                <BarChart3 size={20} color="#3b82f6" />
              </View>
              <Text className="text-3xl font-bold text-blue-700">92%</Text>
              <Text className="text-sm text-gray-600">Attendance</Text>
            </View>
            <View className="w-[48%] bg-green-50 p-4 rounded-xl">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mb-2">
                <BookOpen size={20} color="#10b981" />
              </View>
              <Text className="text-3xl font-bold text-green-700">8.7</Text>
              <Text className="text-sm text-gray-600">CGPA</Text>
            </View>
          </View>
        </View>

        <View className="px-4 pt-6">
          {/* Quick Action Buttons */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</Text>
          <View className="flex-row justify-between mb-6">
            <ActionButton
              label="No Due"
              icon="assignment-turned-in"
              onPress={() => router.push("/student/home/noDueRequest")}
              color="bg-green-600"
            />
            <ActionButton
              label="On-Duty"
              icon="event-available"
              onPress={() => router.push("/student/home/ondutyRequest")}
              color="bg-blue-500"
            />
            <ActionButton
              label="Bonafide"
              icon="receipt"
              onPress={() => router.push("/student/home/bonafideRequest")}
              color="bg-purple-600"
            />
          </View>



          {/* Current Subjects */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-gray-800">Current Subjects</Text>
            </View>

            {
              studentSubjects.slice(0, 3).map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-col gap-2">
                      <Text className="text-gray-500 text-xs">{subject.code}</Text>
                      <Text className="font-medium text-gray-800">{subject.name}</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center">
                      <Text className="text-blue-600 mr-1">View</Text>
                      <ChevronRight size={16} color="#2563eb" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>

          {/* Upcoming Events */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-gray-800">Upcoming Events</Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-blue-600 mr-1">Calendar</Text>
                <Calendar size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>

            {
              upcomingEvents.map((event) => (
                <View key={event.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-row items-start">
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${event.type === "exam"
                          ? "bg-red-100"
                          : event.type === "assignment"
                            ? "bg-amber-100"
                            : "bg-purple-100"
                          }`}
                      >
                        {event.type === "exam" ? (
                          <BookOpen size={18} color="#ef4444" />
                        ) : event.type === "assignment" ? (
                          <Feather name="file-text" size={18} color="#f59e0b" />
                        ) : (
                          <Feather name="monitor" size={18} color="#8b5cf6" />
                        )}
                      </View>
                      <View>
                        <Text className="font-medium text-gray-800">{event.title}</Text>
                        <View className="flex-row items-center mt-1">
                          <Clock size={14} color="#6b7280" />
                          <Text className="text-gray-500 text-xs ml-1">{event.date}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                      <Bell size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
          </View>

          <Announcements />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const ActionButton = ({
  label,
  icon,
  onPress,
  color,
}: {
  label: string
  icon: keyof typeof MaterialIcons.glyphMap
  onPress: () => void
  color: string
}) => (
  <TouchableOpacity
    className={`w-[30%] ${color} p-4 rounded-xl justify-center items-center shadow-sm`}
    onPress={onPress}
  >
    <MaterialIcons name={icon} size={26} color="white" />
    <Text className="text-white text-sm font-semibold mt-1">{label}</Text>
  </TouchableOpacity>
)

export default StudentHomeScreen
