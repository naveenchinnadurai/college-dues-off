import Header from '@/component/header';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Header text="Reset Password" />

      <View className='my-4'>
        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Current password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!isOldPasswordVisible}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}>
              <Ionicons name={isOldPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">New password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
              <Ionicons name={isNewPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Confirm password</Text>
          <View className="border-none border-b rounded-lg flex-row items-center px-4 py-2">
            <TextInput
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="*********"
              className="flex-1 text-lg"
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <Ionicons name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity className="bg-blue-500 py-3 rounded-lg mb-4">
        <Text className="text-white text-center text-lg font-medium">Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="text-center text-blue-500 font-medium">Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
