import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import DefaultText from '../components/DefaultText';
import CustomHeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meal-actions';

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};
const MealDetailScreen = (props) => {
    const mealId = props.navigation.getParam('mealId');
    const allMeals = useSelector((state) => {
        return state.meals.meals; // root state.reducer.field-in-reducer
    });
    const isCurrentMealFav = useSelector((state) => {
        return state.meals.favoriteMeals.some((meal) => meal.id === mealId);
    });

    const selectedMeal = allMeals.find((meal) => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    const { duration, complexity, affordability, imageUrl, ingredients, steps } = selectedMeal;
    useEffect(() => {
        props.navigation.setParams({
            isFavorite: isCurrentMealFav,
            toggleFav: toggleFavoriteHandler,
        }); // setParam merges, not overriding current params
    }, [isCurrentMealFav, toggleFavoriteHandler]);

    return (
        <ScrollView>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{duration}m</DefaultText>
                <DefaultText>{complexity.toUpperCase()}</DefaultText>
                <DefaultText>{affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingridients:</Text>
            {ingredients.map((ing) => (
                <ListItem key={ing} style={styles.ingridient}>
                    {ing}
                </ListItem>
            ))}
            <Text style={styles.title}>Steps:</Text>
            {steps.map((step) => (
                <ListItem key={step} style={styles.step}>
                    {step}
                </ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navData) => {
    const mealId = navData.navigation.getParam('mealId');
    const title = navData.navigation.getParam('mealTitle');
    const toggleFav = navData.navigation.getParam('toggleFav');
    const isFav = navData.navigation.getParam('isFavorite');

    return {
        headerTitle: title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Fav"
                    iconName={isFav ? 'ios-star' : 'ios-star-outline'}
                    onPress={() => {
                        toggleFav(mealId);
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
});
