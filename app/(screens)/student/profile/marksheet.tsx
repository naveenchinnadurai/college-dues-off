import React from 'react';
import Header from '@/component/header';
import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MarksheetScreen() {
    const semesters = [
        { year: "First year", items: [{ name: "Semester-I", type: "odd semester", date: "22.01.2022" }, { name: "Semester-II", type: "Even Semester", date: "14.07.2022" }] },
        { year: "Second Year", items: [{ name: "Semester-III", type: "odd semester", date: "12.02.2023" }, { name: "Semester-IV", type: "Even Semester", date: "10.08.2023" }] },
        { year: "Third Year", items: [{ name: "Semester-V", type: "odd semester", date: "15.02.2024" }, { name: "Semester-VI", type: "Even Semester", date: "20.08.2024" }] },
        { year: "Final Year", items: [{ name: "Semester-VII", type: "odd semester", date: "19.02.2025" }, { name: "Semester-VIII", type: "Even Semester", date: "20.06.2025" }] },
    ];

    return (
        <SafeAreaView className='p-3'>
            <Header text="Marksheet"/>
            <TouchableOpacity className='flex items-end my-1'>
                <Text className="text-blue-500 font-medium text-base flex justify-end">Download all</Text>
            </TouchableOpacity>
            {
                semesters.map((semesterGroup, index) => (
                    <View key={index} className="mb-4">
                        <Text className="text-xl font-bold mb-2">{semesterGroup.year}</Text>
                        {
                            semesterGroup.items.map((semester, semIndex) => (
                                <View key={semIndex} className="flex-row justify-between items-center mb-3">
                                    <View>
                                        <Text className="text-base font-semibold">{semester.name}</Text>
                                        <Text className="text-gray-500">{semester.type} | {semester.date}</Text>
                                    </View>
                                    <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg flex-row items-center">
                                        <FontAwesome name="download" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                ))
            }
        </SafeAreaView>
    );
}
