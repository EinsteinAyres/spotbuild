import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

import AppNavigator from '@navigation/AppNavigator';

import { AlarmProvider } from '@contexts/AlarmContext';
import { CycleProvider } from '@contexts/CycleContext';

// Configura notificações para mostrar em foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AlarmProvider>
                    <CycleProvider>
                        <AppNavigator />
                        <StatusBar style="light" />
                    </CycleProvider>
                </AlarmProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
