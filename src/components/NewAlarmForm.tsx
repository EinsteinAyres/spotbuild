import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TimePicker from './TimePicker';
import { useAlarmContext } from '@contexts/AlarmContext';
import { format } from 'date-fns';

const frequencies = [
    'Diário',
    'A cada 2 dias',
    'A cada 3 dias',
    'Semanal',
];

const NewAlarmForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addAlarm } = useAlarmContext();

    const [drugName, setDrugName] = useState('');
    const [time, setTime] = useState(new Date());
    const [frequency, setFrequency] = useState(frequencies[0]);

    const handleSubmit = () => {
        if (!drugName.trim()) return;

        addAlarm({
            drugName,
            time: format(time, 'HH:mm'),
            frequency,
        });

        onClose();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Fármaco</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Testosterona Enantato"
                placeholderTextColor="#777"
                value={drugName}
                onChangeText={setDrugName}
            />

            <TimePicker label="Horário de Aplicação" value={time} onChange={setTime} />

            <Text style={styles.label}>Frequência</Text>
            {frequencies.map((freq) => (
                <TouchableOpacity
                    key={freq}
                    style={[styles.freqOption, frequency === freq && styles.freqSelected]}
                    onPress={() => setFrequency(freq)}
                >
                    <Text style={styles.freqText}>{freq}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveText}>Salvar Alarme</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1e',
        padding: 20,
        borderRadius: 12,
    },
    label: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#2c2c2e',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    freqOption: {
        padding: 10,
        marginTop: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 6,
    },
    freqSelected: {
        backgroundColor: '#4CAF50',
    },
    freqText: {
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewAlarmForm;
