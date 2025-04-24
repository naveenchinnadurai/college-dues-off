import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useUser } from '@/context/userContext';

export default function StaffProfile() {
  const { user, router } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header Card */}
      <View className="bg-white rounded-3xl mx-4 mt-4 p-5 shadow-md">
        <View className="flex-row items-center gap-4">
          <Image
            source={require('../../../../assets/images/devAssets/profile.jpg')}
            className="w-16 h-16 rounded-full"
          />
          <View className="flex-col">
            <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
            <Text className="text-sm text-gray-600">Staff ID: {user?.id}</Text>
            <Text className="text-sm text-gray-600">Dept. of {user?.department}</Text>
          </View>
        </View>
      </View>

      {/* Dashboard Actions */}
      <View className="mt-6 px-4 gap-4">
        <ActionCard
          title="My Students"
          subtitle="View and manage students under your guidance"
          icon={<FeatherIcons name="users" size={22} />}
        />
        <ActionCard
          title="Lab Statistics"
          subtitle="Overview of attendance, performance & usage"
          icon={<FontAwesome5 name="chart-bar" size={20} />}
        />
        <ActionCard
          title="Manage Tasks"
          subtitle="Assign and monitor programming tasks"
          icon={<FeatherIcons name="clipboard" size={22} />}
        />
        <ActionCard
          title="Attendance Overview"
          subtitle="Check lab attendance summaries"
          icon={<FeatherIcons name="calendar" size={22} />}
        />
      </View>

      {/* Settings Section */}
      <View className="mt-8 px-4 pb-8 bg-white rounded-t-3xl pt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-3">Settings & Support</Text>

        <TouchableOpacity
          className="flex-row justify-between items-center mb-5"
        >
          <View className="flex-row items-center gap-4">
            <FeatherIcons name="lock" size={22} />
            <Text className="text-md text-gray-800">Security & Password</Text>
          </View>
          <Icon name="keyboard-arrow-right" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-4">
            <FeatherIcons name="help-circle" size={22} />
            <Text className="text-md text-gray-800">Help & Support</Text>
          </View>
          <Icon name="keyboard-arrow-right" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

type CardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const ActionCard = ({ title, subtitle, icon }: CardProps) => (
  <TouchableOpacity
    className="bg-white p-5 rounded-2xl shadow-md flex-row items-center gap-4"
  >
    <View className="bg-indigo-100 p-3 rounded-full">{icon}</View>
    <View className="flex-1">
      <Text className="text-md font-semibold text-gray-800">{title}</Text>
      <Text className="text-sm text-gray-500">{subtitle}</Text>
    </View>
    <Icon name="keyboard-arrow-right" size={22} />
  </TouchableOpacity>
);
