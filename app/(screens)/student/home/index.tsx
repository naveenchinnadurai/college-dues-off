import Header from '@/component/profileHeader';
import StoryCard from '@/component/storyCard';
import { useUser } from '@/context/userContext';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Index = () => {
  const { router, subjects, user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4 gap-6">
        {/* Profile Header */}
        <Header />

        {/* College Updates */}
        <View className="gap-3">
          <Text className="text-2xl font-semibold text-gray-800 mt-2">College Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
            {[1, 2, 3, 4, 5].map((e, i) => (
              <StoryCard i={i} key={i} />
            ))}
          </ScrollView>
        </View>

        {/* Attendance Overview */}
        <View className="bg-indigo-100 rounded-xl p-5 my-3 shadow-md">
          <Text className="text-gray-700 text-lg font-semibold mb-2">Attendance Overview</Text>
          <Text className="text-4xl font-bold text-indigo-800">
            {'92'}%
          </Text>
          <Text className="text-sm text-gray-500">Overall Attendance This Semester</Text>
        </View>


        {/* Quick Action Buttons */}
        <View className="gap-3">
          <Text className="text-lg font-medium text-gray-800">Quick Actions</Text>
          <View className="flex-row justify-between">
            <ActionButton
              label="No Due"
              icon="assignment-turned-in"
              onPress={() => router.push('/student/home/noDueRequest')}
              color="bg-green-600"
            />
            <ActionButton
              label="On-Duty"
              icon="event-available"
              onPress={() => router.push('/student/home/ondutyRequest')}
              color="bg-blue-500"
            />
            <ActionButton
              label="Bonafide"
              icon="receipt"
              onPress={() => router.push('/student/home/bonafideRequest')} color="bg-purple-600"
            />
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const ActionButton = ({
  label,
  icon,
  onPress,
  color,
}: {
  label: string;
  icon: string;
  onPress: () => void;
  color: string;
}) => (
  <TouchableOpacity
    className={`w-[30%] ${color} p-4 rounded-xl justify-center items-center gap-1`}
    onPress={onPress}
  >
    <MaterialIcons name={icon} size={26} color="white" />
    <Text className="text-white text-sm font-semibold">{label}</Text>
  </TouchableOpacity>
);

export default Index;
