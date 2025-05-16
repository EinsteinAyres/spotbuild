import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface Cycle {
    id: string;
    name: string;
    goal: string;       // Ex: "Cutting", "Bulking"
    durationWeeks: number;
    compounds: string[]; // Lista de nomes dos compostos
}

interface Props {
    cycle: Cycle;
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const CycleCard: React.FC<Props> = ({ cycle, onPress, onEdit, onDelete }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.header}>
                <Text style={styles.name}>{cycle.name}</Text>
                <Text style={styles.goal}>{cycle.goal}</Text>
            </View>

            <Text style={styles.duration}>Duração: {cycle.durationWeeks} semanas</Text>

            <Text style={styles.compoundsLabel}>Compostos:</Text>
            <Text style={styles.compounds}>
                {cycle.compounds.join(', ')}
            </Text>

            <View style={styles.actions}>
                {onEdit && (
                    <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                        <Feather name="edit" size={20} color="#ccc" />
                    </TouchableOpacity>
                )}
                {onDelete && (
                    <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                        <Feather name="trash-2" size={20} color="#f55" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1f1f1f',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        elevation: 3,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    goal: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
    duration: {
        color: '#aaa',
        marginTop: 8,
    },
    compoundsLabel: {
        color: '#ccc',
        marginTop: 12,
        fontWeight: '600',
    },
    compounds: {
        color: '#fff',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        position: 'absolute',
        top: 12,
        right: 12,
    },
    iconBtn: {
        marginLeft: 12,
    },
});

export default CycleCard;
