import react from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';

export default function Task({data, deleteItem}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <FontAwesome 
                    onPress={deleteItem}
                    style={styles.button}
                    name="trash" 
                    size={15} 
                    color="#22272e" 
                />
            </TouchableOpacity>
            <Text>{data.item}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(196,196,196, 0.20)',
        marginTop: 12,
        padding: 12,
        borderRadius: 4,
        flexDirection: 'row',
        width: '100%'
    },
    button: {
        marginRight: 6,
        marginTop: 2
    }
});