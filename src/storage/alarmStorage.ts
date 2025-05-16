import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alarm {
    id: string;
    drugName: string;
    time: string; // Formato 'HH:mm'
    frequency: 'daily' | 'weekly' | 'monthly';
    notificationId?: string;
}

const STORAGE_KEY = '@spotbuild_alarms';

export const alarmStorage = {
    async getAlarms(): Promise<Alarm[]> {
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

    async saveAlarms(alarms: Alarm[]): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
        } catch (error) {
            console.error('Erro ao salvar alarmes:', error);
        }
    },

    async addAlarm(alarm: Alarm): Promise<void> {
        const alarms = await this.getAlarms();
        alarms.push(alarm);
        await this.saveAlarms(alarms);
    },

    async removeAlarm(id: string): Promise<void> {
        const alarms = await this.getAlarms();
        const filtered = alarms.filter(a => a.id !== id);
        await this.saveAlarms(filtered);
    },

    async updateAlarm(updatedAlarm: Alarm): Promise<void> {
        const alarms = await this.getAlarms();
        const index = alarms.findIndex(a => a.id === updatedAlarm.id);
        if (index !== -1) {
            alarms[index] = updatedAlarm;
            await this.saveAlarms(alarms);
        }
    },
};
