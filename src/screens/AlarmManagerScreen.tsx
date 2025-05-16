import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAlarm } from '@hooks/useAlarm';
import AlarmCard from '@components/AlarmCard';
import { Feather } from '@expo/vector-icons';

const AlarmManagerScreen: React.FC = () => {
    const { alarms, removeAlarm } = useAlarm();
    const [refresh, setRefresh] = useState(false);

    const handleDelete = (id: string) => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente deletar este alarme?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: () => {
                        removeAlarm(id);
                        setRefresh(r => !r); // força rerender
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }: any) => (
        <AlarmCard
            alarm={item}
            onDelete={() => handleDelete(item.id)}
            onPress={() => Alert.alert('Detalhes', JSON.stringify(item, null, 2))}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerenciamento de Alarmes</Text>

            <FlatList
                data={alarms}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum alarme cadastrado.</Text>
                }
                contentContainerStyle={alarms.length === 0 && styles.emptyContainer}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => Alert.alert('Funcionalidade', 'Implementar adicionar alarme')}
            >
                <Feather name="plus" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 16,
        alignSelf: 'center',
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    emptyText: {
        color: '#777',
        fontSize: 16,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 32,
        right: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
});

export default AlarmManagerScreen;
