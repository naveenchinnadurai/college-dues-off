import Header from '@/component/header';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordscreen() {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])


  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    console.log(passwords); // Handle the form submission here
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Header text="Reset Password" />

      <View className='my-4'>
        {/* Old Password */}
        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Current password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!visibility.oldPassword}
              value={passwords.oldPassword}
              onChangeText={(text) => handleChange('oldPassword', text)}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => toggleVisibility('oldPassword')}>
              <Ionicons name={visibility.oldPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">New password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!visibility.newPassword}
              value={passwords.newPassword}
              onChangeText={(text) => handleChange('newPassword', text)}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => toggleVisibility('newPassword')}>
              <Ionicons name={visibility.newPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Confirm Password */}
        <View className="">
          <Text className="text-lg font-medium mb-2">Confirm password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!visibility.confirmPassword}
              value={passwords.confirmPassword}
              onChangeText={(text) => handleChange('confirmPassword', text)}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => toggleVisibility('confirmPassword')}>
              <Ionicons name={visibility.confirmPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text className='text-red-500'>{error}</Text>

      <TouchableOpacity className="bg-blue-500 py-3 rounded-lg my-4" onPress={handleSubmit}>
        <Text className="text-white text-center text-lg font-medium">Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="text-center text-blue-500 font-medium">Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
