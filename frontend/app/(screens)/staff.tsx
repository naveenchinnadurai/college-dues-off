import { useUser } from '@/context/userContext';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Staff = () => {
    const {user}=useUser();
  return (
    <SafeAreaView>
      <Text>{user?.email}</Text>
      <Text>{user?.name}</Text>
      <Text>{user?.id}</Text>
      <Text>{user?.type}</Text>
      <Text>{user?.department}</Text>
    </SafeAreaView>
  )
}

export default Staff