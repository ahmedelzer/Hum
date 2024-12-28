import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather as FiSearch } from '@expo/vector-icons'; // Import the search icon from Feather icons

const SearchForm = () => {
  return (
    <View className={` bg-red-500 mb-3 rounded-md p-2
        w-full relative`}>
      <TextInput
        className='input pl-2'
        placeholder='Search for a ROOM...'
        classNam
      />
      <TouchableOpacity
        className='btn btn-accent absolute top-0 right-0 rounded-tl-none
        rounded-bl-none text-xl m-2'
      >
        <FiSearch className='text-xl m-2' name='search' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};


export default SearchForm;
