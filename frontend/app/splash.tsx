import React from 'react';
import { View, Image } from 'react-native';

const icon = require('../assets/images/icon.png')
function splash() {
  return (
    <View className="bg-[#407BFF] flex-1 justify-center items-center">
      <Image source={icon} className='h-auto w-auto' />
    </View>
  );
}

export default splash;
