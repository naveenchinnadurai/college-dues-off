import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import Header from "@/component/profileHeader"
import StoryCard from "@/component/storyCard"
import { useUser } from "@/context/userContext"
import { Filter } from "lucide-react-native"

// Define request types
type RequestType = "nodue" | "onduty" | "bonafide"
type RequestStatus = "pending" | "approved" | "rejected"

interface Request {
  id: number
  name: string
  regNo: string
  dept: string
  year: string
  status: RequestStatus
  type: RequestType
  date: string
  profilePic?: string
}

const HomeScreen = () => {
  const { user, router } = useUser()

  // Tab state management
  const [activeTab, setActiveTab] = useState<RequestStatus>("pending")
  const [activeRequestType, setActiveRequestType] = useState<RequestType | "all">("all")

  // Requests data with status and type
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      name: "Akash K",
      regNo: "6123212006",
      dept: "CSE",
      year: "IV",
      status: "pending",
      type: "nodue",
      date: "12 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 2,
      name: "John D.",
      regNo: "6123212007",
      dept: "EE",
      year: "II",
      status: "pending",
      type: "onduty",
      date: "11 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 3,
      name: "Maria S.",
      regNo: "6123212008",
      dept: "IT",
      year: "III",
      status: "pending",
      type: "bonafide",
      date: "10 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 4,
      name: "David L.",
      regNo: "6123212009",
      dept: "ME",
      year: "I",
      status: "approved",
      type: "nodue",
      date: "9 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 5,
      name: "Emily M.",
      regNo: "6123211210",
      dept: "ECE",
      year: "IV",
      status: "rejected",
      type: "onduty",
      date: "8 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: 6,
      name: "Sophia K.",
      regNo: "6123211211",
      dept: "CSE",
      year: "III",
      status: "approved",
      type: "bonafide",
      date: "7 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 7,
      name: "Raj P.",
      regNo: "6123211212",
      dept: "IT",
      year: "II",
      status: "pending",
      type: "nodue",
      date: "6 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 8,
      name: "Priya M.",
      regNo: "6123211213",
      dept: "CSE",
      year: "IV",
      status: "pending",
      type: "bonafide",
      date: "5 May 2025",
      profilePic: "https://i.pravatar.cc/150?img=13",
    },
  ])

  // Filter requests based on the active tab and request type
  const filteredRequests = requests.filter(
    (req) => req.status === activeTab && (activeRequestType === "all" || req.type === activeRequestType),
  )

  // Function to update request status
  const updateRequestStatus = (id: number, newStatus: RequestStatus) => {
    setRequests((prevRequests) => prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req)))
  }

  // Function to navigate to reject reason screen
  const handleReject = (request: Request) => {
    router.push("/staff/home/reject")
  }

  // Get request type color and label
  const getRequestTypeInfo = (type: RequestType) => {
    switch (type) {
      case "nodue":
        return { color: "bg-blue-100 text-blue-700", label: "No Due" }
      case "onduty":
        return { color: "bg-purple-100 text-purple-700", label: "On Duty" }
      case "bonafide":
        return { color: "bg-amber-100 text-amber-700", label: "Bonafide" }
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="px-4">
        {/* Profile Section */}
        <Header />

        {/* College Updates Section */}
        <View className="mt-4 mb-5">
          <Text className="text-lg font-bold mb-3">College Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
            <View className="w-[120px] h-52 bg-green-50 justify-center items-center rounded-xl mr-2 border border-green-200">
              <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-2">
                <Text className="text-3xl text-green-600">+</Text>
              </View>
              <Text className="text-sm font-medium text-center text-green-700">Add to Your Story</Text>
            </View>
            {
              [1, 2, 3, 4, 5].map((e, i) => (
                <StoryCard key={i} index={i} />
              ))
            }
          </ScrollView>
        </View>

        {/* Request Type Filter */}
        <View className="mb-4 flex-row gap-2">
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeRequestType === "all" ? "bg-gray-800 text-white" : "bg-gray-100"}`}
            onPress={() => setActiveRequestType("all")}
          >
            <Text className={`font-medium ${activeRequestType === "all" ? "text-white" : "text-gray-800"}`}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeRequestType === "nodue" ? "bg-blue-600" : "bg-blue-50"}`}
            onPress={() => setActiveRequestType("nodue")}
          >
            <Text className={`font-medium ${activeRequestType === "nodue" ? "text-white" : "text-blue-700"}`}>
              No Due
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeRequestType === "onduty" ? "bg-purple-600" : "bg-purple-50"}`}
            onPress={() => setActiveRequestType("onduty")}
          >
            <Text className={`font-medium ${activeRequestType === "onduty" ? "text-white" : "text-purple-700"}`}>
              On Duty
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${activeRequestType === "bonafide" ? "bg-amber-400" : "bg-amber-50"}`}
            onPress={() => setActiveRequestType("bonafide")}
          >
            <Text className={`font-medium ${activeRequestType === "bonafide" ? "text-white" : "text-amber-700"}`}>
              Bonafide
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
          <Feather name="search" size={18} color="#6b7280" />
          <TextInput className="flex-1 ml-2 text-gray-800" placeholder="Search by name or reg no" />
          <TouchableOpacity>
            <Filter size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row justify-between mb-4 border-b border-gray-200">
          {[
            { id: "pending", label: "Pending" },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              className={`pb-2 px-4 ${activeTab === tab.id ? "border-b-2 border-green-500" : ""}`}
              onPress={() => setActiveTab(tab.id as RequestStatus)}
            >
              <Text className={`text-base font-semibold ${activeTab === tab.id ? "text-green-600" : "text-gray-600"}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Requests Section */}
        {filteredRequests.length === 0 ? (
          <View className="py-10 items-center">
            {/* <Image source={require("@/assets/images/empty-state.png")} className="w-40 h-40 opacity-60 mb-4" /> */}
            <Text className="text-center text-gray-500 text-lg">
              No {activeRequestType !== "all" ? getRequestTypeInfo(activeRequestType as RequestType).label : ""}{" "}
              {activeTab} requests
            </Text>
          </View>
        ) : (
          filteredRequests.map((request) => (
            <View key={request.id} className="bg-white rounded-xl p-4 mb-4 border border-gray-100 shadow-sm">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{ uri: request.profilePic || `https://i.pravatar.cc/150?img=${request.id + 5}` }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View>
                    <Text className="font-bold text-[17px] text-gray-800">{request.name}</Text>
                    <Text className="text-gray-500 text-[13px]">
                      {request.regNo} • {request.dept} ({request.year})
                    </Text>
                  </View>
                </View>

                <View className={`px-2.5 py-1 rounded-full ${getRequestTypeInfo(request.type).color}`}>
                  <Text className={`text-xs font-medium`}>{getRequestTypeInfo(request.type).label}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <Feather name="calendar" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-xs ml-1">Requested on {request.date}</Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-end items-center gap-2 mt-2">
                {activeTab === "pending" ? (
                  <>
                    <TouchableOpacity
                      className="border border-red-500 py-2 px-4 rounded-lg flex-row items-center"
                      onPress={() => handleReject(request)}
                    >
                      <Feather name="x" size={16} color="red" />
                      <Text className="text-red-500 font-medium ml-1">Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
                      onPress={() => updateRequestStatus(request.id, "approved")}
                    >
                      <Feather name="check" size={16} color="white" />
                      <Text className="text-white font-medium ml-1">Approve</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    className="border border-gray-300 py-2 px-4 rounded-lg flex-row items-center"
                    onPress={() => updateRequestStatus(request.id, "pending")}
                  >
                    <Feather name="rotate-ccw" size={16} color="#6b7280" />
                    <Text className="text-gray-700 font-medium ml-1">Reset to Pending</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen
