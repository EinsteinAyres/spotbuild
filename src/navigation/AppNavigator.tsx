import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';
import AlarmManagerScreen from '@screens/AlarmManagerScreen';
import CycleBuilderScreen from '@screens/CycleBuilderScreen';

export type RootStackParamList = {
    Home: undefined;
    AlarmManager: undefined;
    CycleBuilder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#4CAF50',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SpotBuild' }} />
                <Stack.Screen name="AlarmManager" component={AlarmManagerScreen} options={{ title: 'Gerenciar Alarmes' }} />
                <Stack.Screen name="CycleBuilder" component={CycleBuilderScreen} options={{ title: 'Montar Ciclo' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
