import React, { createContext, useContext, useEffect, useState } from 'react';
import { cycleService, Cycle } from '@services/cycleService';
import { v4 as uuidv4 } from 'uuid';

interface CycleContextType {
    cycles: Cycle[];
    addCycle: (cycle: Omit<Cycle, 'id' | 'createdAt'>) => Promise<void>;
    removeCycle: (id: string) => Promise<void>;
    updateCycle: (cycle: Cycle) => Promise<void>;
    reloadCycles: () => Promise<void>;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider: React.FC = ({ children }) => {
    const [cycles, setCycles] = useState<Cycle[]>([]);

    const reloadCycles = async () => {
        const loaded = await cycleService.loadCycles();
        setCycles(loaded);
    };

    useEffect(() => {
        reloadCycles();
    }, []);

    const addCycle = async (cycleData: Omit<Cycle, 'id' | 'createdAt'>) => {
        const newCycle: Cycle = {
            ...cycleData,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        };
        await cycleService.saveCycle(newCycle);
        setCycles(prev => [...prev, newCycle]);
    };

    const removeCycle = async (id: string) => {
        await cycleService.deleteCycle(id);
        setCycles(prev => prev.filter(c => c.id !== id));
    };

    const updateCycle = async (cycle: Cycle) => {
        await cycleService.saveCycle(cycle);
        setCycles(prev => prev.map(c => (c.id === cycle.id ? cycle : c)));
    };

    return (
        <CycleContext.Provider value={{ cycles, addCycle, removeCycle, updateCycle, reloadCycles }}>
            {children}
        </CycleContext.Provider>
    );
};

export function useCycle() {
    const context = useContext(CycleContext);
    if (!context) {
        throw new Error('useCycle must be used within a CycleProvider');
    }
    return context;
}
