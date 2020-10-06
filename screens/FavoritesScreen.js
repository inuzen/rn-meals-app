import React from 'react';
import MealList from '../components/MealList';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
const FavoritesScreen = (props) => {
    const favMeals = useSelector((state) => {
        return state.meals.favoriteMeals; // root state.reducer.field-in-reducer
    });
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No Favorite meals found. Start adding some!</DefaultText>
            </View>
        );
    }
    return <MealList listData={favMeals} navigation={props.navigation} />;
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
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default FavoritesScreen;
