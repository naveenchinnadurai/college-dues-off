import Header from "@/component/header"
import { useUser } from "@/context/userContext"
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function StaffProfile() {
  const { user, router } = useUser()

  // Mock user data - replace with actual user context data
  const staffData = {
    id: "ST2023045",
    name: "Dr. Sakthivel",
    department: "Computer Science",
    email: "sakthivel@college.edu",
    phone: "+91 9876543210",
    designation: "Assistant Professor",
    joinDate: "15 Aug 2018",
    subjects: ["Data Structures", "Algorithms", "Database Management"],
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with profile image and basic info */}
        <Header className='left-4 absolute'/>
        <View className="bg-white pt-6 pb-8 shadow-sm">
          <View className="items-center">
            <View className="relative">
              <Image
                source={require("../../../../assets/images/devAssets/staff.jpg")}
                className="w-24 h-24 rounded-full border-2 border-white"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full">
                <Feather name="edit-2" size={14} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold text-gray-800 mt-3">{staffData.name}</Text>
            <Text className="text-gray-600">{staffData.designation}</Text>
            <Text className="text-gray-500 text-sm">Department of {staffData.department}</Text>

            <View className="flex-row mt-5 gap-3">
              <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full flex-row items-center">
                <Feather name="edit" size={16} color="#374151" />
                <Text className="text-gray-700 font-medium ml-2">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Personal Information Section */}
        <View className="bg-white mt-4 p-5 mx-4 rounded-xl shadow-sm">
          <View className="flex-row items-center mb-4">
            <Feather name="user" size={18} color="#4B5563" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">Personal Information</Text>
          </View>

          <InfoItem icon="id-badge" label="Staff ID" value={staffData.id} />
          <InfoItem icon="mail" label="Email" value={staffData.email} />
          <InfoItem icon="phone" label="Phone" value={staffData.phone} />
          <InfoItem icon="calendar" label="Joined" value={staffData.joinDate} />
        </View>

        {/* Academic Information */}
        <View className="bg-white mt-4 p-5 mx-4 rounded-xl shadow-sm">
          <View className="flex-row items-center mb-4">
            <Feather name="book-open" size={18} color="#4B5563" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">Subjects Teaching</Text>
          </View>
          <View className="flex-row flex-wrap gap-2 mt-1">
            {staffData.subjects.map((subject, index) => (
              <View key={index} className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-blue-700 text-sm">{subject}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white mt-4 p-5 mx-4 rounded-xl shadow-sm">
          <View className="flex-row items-center mb-4">
            <Feather name="grid" size={18} color="#4B5563" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">Quick Actions</Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            <ActionButton icon="users" label="My Students" />
            <ActionButton icon="clipboard" label="Manage Tasks" />
            <ActionButton icon="file-text" label="Reports" />
            <ActionButton icon="bell" label="Notifications" />
          </View>
        </View>

        {/* Settings Section */}
        <View className="bg-white mt-4 p-5 mx-4 rounded-xl shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Feather name="settings" size={18} color="#4B5563" />
            <Text className="text-lg font-semibold text-gray-800 ml-2">Settings & Support</Text>
          </View>

          <SettingsItem icon="lock" label="Security & Password" />
          <SettingsItem icon="help-circle" label="Help & Support" />
          <SettingsItem icon="info" label="About App" />
          <SettingsItem icon="log-out" label="Logout" onPress={() => console.log("Logout pressed")} textColor="text-red-500" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

type InfoItemProps = {
  icon: string
  label: string
  value: string
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <View className="flex-row items-center py-2 border-b border-gray-100">
    <Feather name={icon as any} size={16} color="#6B7280" className="w-6" />
    <Text className="text-gray-600 w-24">{label}</Text>
    <Text className="text-gray-800 flex-1">{value}</Text>
  </View>
)

type ActionButtonProps = {
  icon: string
  label: string
  onPress?: () => void
}

const ActionButton = ({ icon, label, onPress }: ActionButtonProps) => (
  <TouchableOpacity className="items-center justify-center w-[48%] py-4 mb-3 bg-gray-50 rounded-xl" onPress={onPress}>
    <View className="bg-green-50 p-2 rounded-full mb-2">
      <Feather name={icon as any} size={20} color="#059669" />
    </View>
    <Text className="text-gray-700 font-medium">{label}</Text>
  </TouchableOpacity>
)

type SettingsItemProps = {
  icon: string
  label: string
  onPress?: () => void
  textColor?: string
}

const SettingsItem = ({ icon, label, onPress, textColor = "text-gray-800" }: SettingsItemProps) => (
  <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" onPress={onPress}>
    <View className="bg-gray-100 p-2 rounded-full">
      <Feather name={icon as any} size={18} color="#4B5563" />
    </View>
    <Text className={`ml-3 ${textColor}`}>{label}</Text>
    {
      !["Logout", "About App"].includes(label) && (
        <MaterialIcons name="keyboard-arrow-right" size={22} color="#9CA3AF" style={{ marginLeft: "auto" }} />
      )
    }
  </TouchableOpacity>
)
