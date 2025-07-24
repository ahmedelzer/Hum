import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useNetwork } from '../../context/NetworkContext';
import { theme } from '../Theme';

const ConnectionStatusOverlay = () => {
  const { isOnline } = useNetwork();

  if (isOnline) return null;

  return (
     <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0, // full height
      
      backgroundColor: theme.error,
      padding: 10,
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: theme.text, textAlign: 'center', fontSize: 18 }}>
      No Internet Connection
    </Text>
  </View>
  );
};

export default ConnectionStatusOverlay;
