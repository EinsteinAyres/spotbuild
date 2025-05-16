import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HomeScreenProps {
    navigation: any; // Ajuste depois para tipo correto, ex: NativeStackNavigationProp
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SpotBuild</Text>

            <TouchableOpacity
                style={[styles.button, styles.drugsButton]}
                onPress={() => navigation.navigate('DrugManager')}
            >
                <Text style={styles.buttonText}>Farmacologia</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.nutritionButton]}
                onPress={() => navigation.navigate('Nutrition')}
                disabled
            >
                <Text style={styles.buttonText}>Nutrição (Em breve)</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.trainingButton]}
                onPress={() => navigation.navigate('Training')}
                disabled
            >
                <Text style={styles.buttonText}>Treinos (Em breve)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        paddingVertical: 18,
        borderRadius: 10,
        marginVertical: 12,
        alignItems: 'center',
        elevation: 3,
    },
    drugsButton: {
        backgroundColor: '#388E3C',
    },
    nutritionButton: {
        backgroundColor: '#6d6d6d',
    },
    trainingButton: {
        backgroundColor: '#6d6d6d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default HomeScreen;
