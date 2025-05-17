import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

interface StoryCardProps {
  index: number
}

// Sample data for stories
const storyData = [
  {
    id: 1,
    name: "Dr. Sakthivel",
    role: "CSE - HOD",
    time: "2h ago",
  },
  {
    id: 2,
    name: "Prof. Ramesh",
    role: "IT Department",
    time: "4h ago",
  },
  {
    id: 3,
    name: "Dr. Priya",
    role: "ECE - HOD",
    time: "6h ago",
  },
  {
    id: 4,
    name: "Prof. Kumar",
    role: "Mech Dept",
    time: "8h ago",
  },
  {
    id: 5,
    name: "Dr. Lakshmi",
    role: "Principal",
    time: "12h ago",
  },
]

const StoryCard = ({ index }: StoryCardProps) => {
  // Use modulo to cycle through the data if index is out of bounds
  const storyIndex = index % storyData.length
  const story = storyData[storyIndex]

  return (
    <TouchableOpacity className="w-[120px] h-52 rounded-xl mr-2 overflow-hidden">
      <View  className="flex-1 justify-between p-2" >
        {/* Gradient overlay for better text visibility */}
        <View className="absolute inset-0 bg-black opacity-30 rounded-xl" />

        {/* Profile info at top */}
        <View className="flex-row items-center z-10">
          {/* <Image source={story.profilePic} className="w-8 h-8 rounded-full border-2 border-green-500" /> */}
          <View className="ml-1">
            <Text className="text-white font-bold text-xs" numberOfLines={1}>
              {story.name}
            </Text>
            <Text className="text-white text-xs opacity-80" numberOfLines={1}>
              {story.time}
            </Text>
          </View>
        </View>

        {/* Bottom info */}
        <View className="z-10">
          <Text className="text-white font-bold text-xs">{story.role}</Text>
          <View className="flex-row items-center mt-1">
            <Feather name="eye" size={12} color="white" />
            <Text className="text-white text-xs ml-1">View</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default StoryCard