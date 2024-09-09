import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { styled } from 'nativewind';
import SearchForm from '../components/SearchForm';

function Rooms() {
    const navigation = useNavigation();
    const pressHandler = (i) => {
        navigation.navigate("Room", { id: i.key});
        // console.log(e.key)
      };
      // console.log(111)
  const data=[
    {key: 'Devin',
  id:1
  },
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ];
  const renderItem = ({ item }) => (
    <Text onPress={()=>pressHandler(item)} className={`text-center border 
    border-rose-700 hover:bg-rose-700 p-3 mb-2`}>
    {item.key}
    </Text>
  );
  return (
    <ScrollView
      scrollEventThrottle={16}
      className='my-10'
    >
    <View className="bg-white pt-4 px-4">
    <View className='flex flex-row justify-between items-center pb-4'>
      <Text className='text-[19px] font-bold'>Rooms</Text>
      <AntDesign name="pluscircle" size={24} color="black" />
    </View>
    <SearchForm/>
    <FlatList
      data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.key.toString()}
    />
  </View>
    </ScrollView>
  )
}

export default Rooms