
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drug } from '@models/Drug';

export interface CycleDrug {
    drug: Drug;
    doseMg: number;
    durationWeeks: number;
}

export interface Cycle {
    id: string;
    name: string;
    drugs: CycleDrug[];
    createdAt: string;
}

const STORAGE_KEY = '@spotbuild_cycles';

export const cycleService = {
    async loadCycles(): Promise<Cycle[]> {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) {
                return JSON.parse(json);
            }
            return [];
        } catch (error) {
            console.error('Erro ao carregar ciclos:', error);
            return [];
        }
    },

    async saveCycle(cycle: Cycle): Promise<void> {
        try {
            const cycles = await this.loadCycles();
            const existingIndex = cycles.findIndex(c => c.id === cycle.id);

            if (existingIndex >= 0) {
                cycles[existingIndex] = cycle;
            } else {
                cycles.push(cycle);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
        } catch (error) {
            console.error('Erro ao salvar ciclo:', error);
        }
    },

    async deleteCycle(id: string): Promise<void> {
        try {
            const cycles = await this.loadCycles();
            const filtered = cycles.filter(c => c.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        } catch (error) {
            console.error('Erro ao deletar ciclo:', error);
        }
    },
};
