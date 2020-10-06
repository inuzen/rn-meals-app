import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/colors';
import { setFilters } from '../store/actions/meal-actions';
import { isAndroid } from '../utility/helper-fns';

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{
                    false: '',
                    true: Colors.primaryColor,
                }}
                thumbColor={isAndroid() ? Colors.primaryColor : ''}
            />
        </View>
    );
};

const FiltersScreen = (props) => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarianFree, setIsVegetarianFree] = useState(false);
    const [isVeganFree, setIsVeganFree] = useState(false);
    const dispatch = useDispatch();
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarianFree: isVegetarianFree,
            veganFree: isVeganFree,
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVeganFree, isVegetarianFree, dispatch]);

    useEffect(() => {
        props.navigation.setParams({
            save: saveFilters,
        });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Avaliable filters</Text>
            <FilterSwitch label="Gluten-free" state={isGlutenFree} onChange={(newVal) => setIsGlutenFree(newVal)} />
            <FilterSwitch label="Lactose-free" state={isLactoseFree} onChange={(newVal) => setIsLactoseFree(newVal)} />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarianFree}
                onChange={(newVal) => setIsVegetarianFree(newVal)}
            />
            <FilterSwitch label="Vegan" state={isVeganFree} onChange={(newVal) => setIsVeganFree(newVal)} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filters',
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        ),
    };
};

export default FiltersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
});
