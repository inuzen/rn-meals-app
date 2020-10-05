import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const CategoryGridTile = (props) => {
    const { id, title, color, onSelect } = props;
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={onSelect}>
                <View style={{ ...styles.container, backgroundColor: color }}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 5,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right',
    },
});
