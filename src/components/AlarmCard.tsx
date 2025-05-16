import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AlarmCardProps {
    drugName: string;
    time: string; // formato 'HH:mm'
    frequency: string;
    onEdit: () => void;
    onDelete: () => void;
}

const AlarmCard: React.FC<AlarmCardProps> = ({ drugName, time, frequency, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.drugName}>{drugName}</Text>
                <Text style={styles.detail}>Horário: {time}</Text>
                <Text style={styles.detail}>Frequência: {frequency}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                    <Ionicons name="create-outline" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                    <Ionicons name="trash-outline" size={20} color="#f44336" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    infoContainer: {
        flex: 1,
    },
    drugName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    detail: {
        fontSize: 14,
        color: '#cccccc',
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    iconButton: {
        marginLeft: 12,
    },
});

export default AlarmCard;
