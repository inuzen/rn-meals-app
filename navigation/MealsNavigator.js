import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import Colors from '../constants/colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {} from 'react-native-paper';
import { isAndroid } from '../utility/helper-fns';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: isAndroid() ? Colors.primaryColor : '',
    },
    headerTintColor: isAndroid() ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
};
const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: {
            screen: CategoriesMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    {
        // initialRouteName: 'Categories',
        mode: 'modal',
        //options to be used in screens inside the navigator
        defaultNavigationOptions: defaultStackNavOptions,
        //options to be used when the navigator itself IS a screen inside different navigator
        // navigationOptions: {
        // }
    },
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen,
    },
    {
        mode: 'modal',
        defaultNavigationOptions: defaultStackNavOptions,
    },
);
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: isAndroid() ? <Text style={{ fontFamily: 'open-sans' }}>Meals</Text> : 'Meals',
        },
    },

    Fav: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: isAndroid() ? <Text style={{ fontFamily: 'open-sans' }}>Favorites</Text> : 'Favorites',
        },
    },
};

const MealsFavTabNavigator = isAndroid()
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
          activeColor: 'white',
          shifting: true,
          barStyle: {
              backgroundColor: Colors.primaryColor,
          },
      })
    : createBottomTabNavigator(tabScreenConfig, {
          tabBarOptions: {
              labelStyle: {
                  fontFamily: 'open-sans',
              },
              activeTintColor: Colors.accentColor,
          },
      });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen,
    },
    { defaultNavigationOptions: defaultStackNavOptions, navigationOptions: { drawerLabel: 'Filters' } },
);

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals',
            },
        },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold',
                fontSize: 16,
            },
        },
    },
);

export default createAppContainer(MainNavigator);
