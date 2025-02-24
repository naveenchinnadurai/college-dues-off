import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "@expo/vector-icons/Feather";
import Header from "@/component/profileHeader";
import StoryCard from "@/component/storyCard";
import { useUser } from "@/context/userContext";

const HomeScreen = () => {
  const { user, router } = useUser();

  // Tab state management
  const [activeTab, setActiveTab] = useState<string>("pending");

  // Requests data with status
  const [requests, setRequests] = useState([
    { id: 1, name: "Akash K", regNo: "6123212006", dept: "CSE (IV)", status: "pending" },
    { id: 2, name: "John D.", regNo: "6123212007", dept: "EE (II)", status: "pending" },
    { id: 3, name: "Maria S.", regNo: "6123212008", dept: "IT (III)", status: "pending" },
    { id: 4, name: "David L.", regNo: "6123212009", dept: "ME (I)", status: "accepted" },
    { id: 5, name: "Emily M.", regNo: "6123211210", dept: "ECE (IV)", status: "rejected" },
    { id: 6, name: "Sophia K.", regNo: "6123211211", dept: "CSE (III)", status: "accepted" },
  ]);

  // Filter requests based on the active tab
  const filteredRequests = requests.filter((req) => req.status === activeTab);

  // Function to update request status
  const updateRequestStatus = (id: number, newStatus: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  // Function to navigate to reject reason screen
  const handleReject = (request: any) => {
    alert(request.name)
    // router.push('/(screens)/staff/home/reject')
  };

  return (
    <ScrollView className="flex h-screen w-screen bg-white px-4">
      <SafeAreaView>
        {/* Profile Section */}
        <Header />

        {/* College Updates Section */}
        <Text className="text-lg font-bold my-3">College Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
          <View className="w-[110px] h-44 bg-green-100 justify-center items-center rounded-lg mr-2">
            <Text className="text-4xl text-black">+</Text>
            <Text className="text-sm w-4/5 text-center">Add to Your Story</Text>
          </View>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <StoryCard key={i} i={i} />
          ))}
        </ScrollView>

        {/* Tab Navigation */}
        <View className="flex-row justify-between my-3">
          {["pending", "accepted", "rejected"].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`pb-2 px-1.5 ${activeTab === tab ? "border-b-2 border-green-500" : ""}`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`text-lg font-semibold`}>
                {tab == "pending" ? "Pending Requests" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {
          //Requests Section 

          filteredRequests.length === 0 ? (
            <Text className="text-center text-gray-500 my-5">No {activeTab} requests</Text>
          ) : (
            filteredRequests.map((request) => (
              <View
                key={request.id}
                className="flex-row items-center justify-between py-2.5 border-b border-gray-200"
              >
                <View className="flex-row items-center gap-2">
                  <Image
                    source={{ uri: `https://i.pravatar.cc/150?img=${request.id + 5}` }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="flex-col">
                    <Text className="font-bold text-[17px]">{request.name}</Text>
                    <Text className="text-gray-500 text-[13px]">
                      {request.regNo} - {request.dept}
                    </Text>
                  </View>
                </View>

                {
                  // Action Buttons
                  activeTab === "pending" ? (
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity
                        className="border border-red-500 py-1.5 px-3 rounded-lg"
                        onPress={() => router.push('/staff/home/reject')}
                      >
                        <FeatherIcon name="x" size={20} color="red" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="border border-green-600 py-1.5 px-3 rounded-lg"
                        onPress={() => updateRequestStatus(request.id, "accepted")}
                      >
                        <FeatherIcon name="check" size={20} color="green" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      className="border border-yellow-500 py-1.5 px-3 rounded-lg"
                      onPress={() => updateRequestStatus(request.id, "pending")}
                    >
                      <FeatherIcon name="rotate-ccw" size={20} color="orange" />
                    </TouchableOpacity>
                  )
                }
              </View>
            ))
          )
        }
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
