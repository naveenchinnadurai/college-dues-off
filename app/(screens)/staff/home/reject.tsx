import Header from "@/component/header";
import { useUser } from "@/context/userContext";
import FeatherIcon from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const RejectReasonScreen = () => {
    const { router } = useUser();
    const [reason, setReason] = useState("");

    const submitReason = () => {
        if (reason.trim().length === 0) return;

    };

    return (
        <View className="flex-1 bg-white p-4 justify-between">
            {/* Header */}
            <Header text="Akash K" className="!justify-start ps-10"/>

            {/* Input Box */}
            <View className="flex-row relative">
                <TextInput
                    placeholder="Give a reason..."
                    className="border w-full rounded-lg p-3 text-lg"
                    value={reason}
                    onChangeText={setReason}
                />

                {/* Submit Button */}
                <TouchableOpacity
                    className="absolute right-0 w-fit p-3 rounded-lg flex-row items-center justify-center"
                    onPress={submitReason}
                >
                    <FeatherIcon name="send-outline" size={25} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RejectReasonScreen;
