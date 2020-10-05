import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { MEALS } from '../data/dummy-data';

const MealDetailScreen = (props) => {
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button
                title="go to categories"
                onPress={() => {
                    props.navigation.popToTop();
                }}
            />
        </View>
    );
};

MealDetailScreen.navigationOptions = (navData) => {
    const mealId = navData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Fav"
                    iconName="ios-star"
                    onPress={() => {
                        console.log('mark as fav');
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
