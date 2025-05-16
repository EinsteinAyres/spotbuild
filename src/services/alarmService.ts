import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export interface AlarmData {
    id: string;
    drugName: string;
    time: string; // 'HH:mm'
    frequency: 'diário' | 'semanal' | 'mensal';
    notificationId?: string; // ID da notificação agendada
}

const STORAGE_KEY = '@spotbuild_alarms';

export const alarmService = {
    async loadAlarms(): Promise<AlarmData[]> {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) {
                return JSON.parse(json);
            }
            return [];
        } catch (error) {
            console.error('Erro ao carregar alarmes:', error);
            return [];
        }
    },

    async saveAlarms(alarms: AlarmData[]): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
        } catch (error) {
            console.error('Erro ao salvar alarmes:', error);
        }
    },

    async scheduleNotification(alarm: AlarmData): Promise<string | undefined> {
        try {
            const [hour, minute] = alarm.time.split(':').map(Number);
            const trigger = new Date();
            trigger.setHours(hour, minute, 0, 0);

            // Se a hora já passou hoje, agenda para amanhã
            if (trigger <= new Date()) {
                trigger.setDate(trigger.getDate() + 1);
            }

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Hora do fármaco',
                    body: `Hora de tomar ${alarm.drugName}`,
                    sound: true,
                },
                trigger: {
                    date: trigger,
                },
            });

            return notificationId;
        } catch (error) {
            console.error('Erro ao agendar notificação:', error);
            return undefined;
        }
    },

    async cancelNotification(notificationId: string): Promise<void> {
        try {
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        } catch (error) {
            console.error('Erro ao cancelar notificação:', error);
        }
    },
};
