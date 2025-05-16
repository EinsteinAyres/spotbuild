import { useContext } from 'react';
import { AlarmContext } from '@contexts/AlarmContext';

export const useAlarm = () => {
    const context = useContext(AlarmContext);

    if (!context) {
        throw new Error('useAlarm deve ser usado dentro de um AlarmProvider');
    }

    const { alarms, addAlarm, removeAlarm, updateAlarm } = context;

    const getAlarmById = (id: string) => alarms.find(a => a.id === id);

    return {
        alarms,
        addAlarm,
        removeAlarm,
        updateAlarm,
        getAlarmById,
    };
};
