import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface TimePickerProps {
    label?: string;
    value: Date;
    onChange: (date: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label = 'Horário', value, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
                <Text style={styles.timeText}>{format(value, 'HH:mm')}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={value}
                    mode="time"
                    is24Hour
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    label: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 6,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#1f1f1f',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    timeText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TimePicker;
