import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
function Room() {
  const route = useRoute();
  const { id } = route.params;
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (e) => {
      setInputValue(`${e.target.value}`);
    };
  
    const handleButtonPress = () => {
      Alert.alert('Input Value', `${inputValue}`);
    };
  return (
    <View>
    <Text className='text-center mb-2'>Room Screen for ID: {id}</Text>
    <ScrollView
      scrollEventThrottle={16}
      className='my-10'
    >
    
    </ScrollView>
    <View className='flex flex-row items-center justify-between m-2'>
    <TextInput
        className="border border-gray-400 rounded-lg p-2 bottom-0 w-[90%]"
        placeholder="Type something..."
        onChange={handleInputChange}
        value={inputValue}
      />
      <MaterialCommunityIcons name="send-circle" size={29} color="black" />
    </View>
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  )
}

export default Room
