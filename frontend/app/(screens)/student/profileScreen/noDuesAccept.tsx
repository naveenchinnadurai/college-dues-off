import {  } from "react-native";

import React from 'react';
import { View, Text } from 'react-native';
import Header from "@/component/header";
import { SafeAreaView } from "react-native-safe-area-context";

const NoDuesAccept = () => {
  return (
    <SafeAreaView className="w-full p-3 h-screen bg-white">
      <Header text="No Dues Accepted"/>

      <View className="mt-3 space-y-4">
        {
            ["Adhoc Sensor & Networks", "Cloud Computing", "SMPS & UPS"].map((e,i)=>{
                return (
                    <View className="bg-green-50 rounded-lg p-3" key={i}>
                        <Text className="text-gray-800 font-semibold text-lg"> {e}</Text>
                        <Text className="text-green-600 text-base mt-1">
                            Your NoDue Request Accepted!
                        </Text>
                    </View>
                )
            })
        }
      </View>
    </SafeAreaView>
  );
};

export default NoDuesAccept;