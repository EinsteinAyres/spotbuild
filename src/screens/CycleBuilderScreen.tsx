import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView,
} from 'react-native';
import { Drugs } from '@models/Drugs';
import { Drug } from '@models/Drug';

interface CycleDrug {
    drug: Drug;
    doseMg: number;
    durationWeeks: number;
}

const CycleBuilderScreen: React.FC = () => {
    const [selectedDrugs, setSelectedDrugs] = useState<CycleDrug[]>([]);
    const [doseInput, setDoseInput] = useState<string>('');
    const [durationInput, setDurationInput] = useState<string>('');

    const toggleDrugSelection = (drug: Drug) => {
        const exists = selectedDrugs.find(d => d.drug.name === drug.name);
        if (exists) {
            setSelectedDrugs(selectedDrugs.filter(d => d.drug.name !== drug.name));
        } else {
            setSelectedDrugs([
                ...selectedDrugs,
                { drug, doseMg: 0, durationWeeks: 0 },
            ]);
        }
    };

    const updateDose = (name: string, dose: number) => {
        setSelectedDrugs((prev) =>
            prev.map(d =>
                d.drug.name === name ? { ...d, doseMg: dose } : d
            )
        );
    };

    const updateDuration = (name: string, duration: number) => {
        setSelectedDrugs((prev) =>
            prev.map(d =>
                d.drug.name === name ? { ...d, durationWeeks: duration } : d
            )
        );
    };

    const renderDrugItem = ({ item }: { item: Drug }) => {
        const selected = !!selectedDrugs.find(d => d.drug.name === item.name);

        return (
            <TouchableOpacity
                style={[styles.drugItem, selected && styles.drugItemSelected]}
                onPress={() => toggleDrugSelection(item)}
            >
                <Text style={styles.drugName}>{item.name}</Text>
                {selected && (
                    <View style={styles.inputsRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Dose (mg)"
                            keyboardType="numeric"
                            onChangeText={(text) => updateDose(item.name, Number(text))}
                            value={
                                selectedDrugs.find(d => d.drug.name === item.name)?.doseMg.toString() || ''
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Duração (semanas)"
                            keyboardType="numeric"
                            onChangeText={(text) => updateDuration(item.name, Number(text))}
                            value={
                                selectedDrugs.find(d => d.drug.name === item.name)?.durationWeeks.toString() || ''
                            }
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const saveCycle = () => {
        if (selectedDrugs.length === 0) {
            Alert.alert('Erro', 'Selecione pelo menos um fármaco para o ciclo.');
            return;
        }
        for (const d of selectedDrugs) {
            if (d.doseMg <= 0 || d.durationWeeks <= 0) {
                Alert.alert(
                    'Erro',
                    `Informe dose e duração válidas para o fármaco ${d.drug.name}.`
                );
                return;
            }
        }
        Alert.alert('Sucesso', 'Ciclo salvo com sucesso! (Funcionalidade futura)');
        // Aqui você pode disparar um contexto, salvar no storage, ou backend
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Montar Ciclo</Text>
            <FlatList
                data={Drugs}
                keyExtractor={(item) => item.name}
                renderItem={renderDrugItem}
                extraData={selectedDrugs}
                scrollEnabled={false}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveCycle}>
                <Text style={styles.saveButtonText}>Salvar Ciclo</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        textAlign: 'center',
    },
    drugItem: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
    },
    drugItemSelected: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    drugName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    inputsRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        flex: 0.48,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
    saveButton: {
        marginTop: 30,
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CycleBuilderScreen;
