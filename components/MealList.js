import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MealItem from './MealItem';

const MealList = (props) => {
    const renderListItem = (itemData) => {
        const { id, title, duration, complexity, affordability, imageUrl } = itemData.item;

        return (
            <MealItem
                title={title}
                duration={duration}
                complexity={complexity}
                affordability={affordability}
                imageUrl={imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: id,
                        },
                    });
                }}
            />
        );
    };
    return (
        <View style={styles.list}>
            <FlatList data={props.listData} renderItem={renderListItem} style={{ width: '100%' }} />
        </View>
    );
};

export default MealList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
});
