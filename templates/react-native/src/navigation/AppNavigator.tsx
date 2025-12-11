import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from '@navigation/TabsNavigator';
import SettingsScreen from '@screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
