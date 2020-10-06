import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';
import DefaultText from '../components/DefaultText';

const CategoriesMealsScreen = (props) => {
    const catId = props.navigation.getParam('categoryId');
    const avaliableMeals = useSelector((state) => {
        return state.meals.filteredMeals; // root state.reducer.field-in-reducer
    });
    const displayedMeals = avaliableMeals.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);
    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        );
    }
    return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoriesMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    };
};

export default CategoriesMealsScreen;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
