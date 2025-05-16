import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alarm, alarmStorage } from '@storage/alarmStorage';
import * as Notifications from 'expo-notifications';
import { v4 as uuidv4 } from 'uuid';

interface AlarmContextType {
    alarms: Alarm[];
    addAlarm: (alarm: Omit<Alarm, 'id' | 'notificationId'>) => Promise<void>;
    removeAlarm: (id: string) => Promise<void>;
    updateAlarm: (alarm: Alarm) => Promise<void>;
    reloadAlarms: () => Promise<void>;
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider: React.FC = ({ children }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    // Carrega alarmes do storage no início
    const reloadAlarms = async () => {
        const loaded = await alarmStorage.getAlarms();
        setAlarms(loaded);
    };

    useEffect(() => {
        reloadAlarms();
    }, []);

    const addAlarm = async (alarmData: Omit<Alarm, 'id' | 'notificationId'>) => {
        const id = uuidv4();

        // Agenda notificação
        const [hour, minute] = alarmData.time.split(':').map(Number);
        const trigger = new Date();
        trigger.setHours(hour, minute, 0, 0);
        if (trigger <= new Date()) trigger.setDate(trigger.getDate() + 1);

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hora do fármaco',
                body: `Hora de tomar ${alarmData.drugName}`,
                sound: true,
            },
            trigger,
        });

        const newAlarm: Alarm = { id, notificationId, ...alarmData };
        await alarmStorage.addAlarm(newAlarm);
        setAlarms(prev => [...prev, newAlarm]);
    };

    const removeAlarm = async (id: string) => {
        const alarm = alarms.find(a => a.id === id);
        if (alarm?.notificationId) {
            await Notifications.cancelScheduledNotificationAsync(alarm.notificationId);
        }
        await alarmStorage.removeAlarm(id);
        setAlarms(prev => prev.filter(a => a.id !== id));
    };

    const updateAlarm = async (updatedAlarm: Alarm) => {
        // Cancela notificação antiga
        if (updatedAlarm.notificationId) {
            await Notifications.cancelScheduledNotificationAsync(updatedAlarm.notificationId);
        }

        // Agenda nova notificação
        const [hour, minute] = updatedAlarm.time.split(':').map(Number);
        const trigger = new Date();
        trigger.setHours(hour, minute, 0, 0);
        if (trigger <= new Date()) trigger.setDate(trigger.getDate() + 1);

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hora do fármaco',
                body: `Hora de tomar ${updatedAlarm.drugName}`,
                sound: true,
            },
            trigger,
        });

        const alarmToSave = { ...updatedAlarm, notificationId };
        await alarmStorage.updateAlarm(alarmToSave);

        setAlarms(prev =>
            prev.map(a => (a.id === alarmToSave.id ? alarmToSave : a))
        );
    };

    return (
        <AlarmContext.Provider value={{ alarms, addAlarm, removeAlarm, updateAlarm, reloadAlarms }}>
            {children}
        </AlarmContext.Provider>
    );
};

export function useAlarm() {
    const context = useContext(AlarmContext);
    if (!context) {
        throw new Error('useAlarm must be used within an AlarmProvider');
    }
    return context;
}
