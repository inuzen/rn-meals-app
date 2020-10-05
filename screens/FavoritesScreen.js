import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
const FavoritesScreen = (props) => {
    const displayedMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');
    return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default FavoritesScreen;
