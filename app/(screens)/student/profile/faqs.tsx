import FAQS from '@/component/faqsDisplay';
import { studentFAQS } from '@/utils/data';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpSupportScreen() {

    return (
        <SafeAreaView className="flex-1 flex-col justify-between p-3">
            <FAQS faqs={studentFAQS} />
        </SafeAreaView>
    );
}
