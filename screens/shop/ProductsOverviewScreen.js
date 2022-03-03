import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet,Button, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/colors';

const ProductsOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products.availableProducts);

    const loadProducts = useCallback ( async () => {
        setError(null);
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false)
    },[ setError, setIsLoading, dispatch ]);
    
    useEffect( () => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        };
    },[loadProducts]);

    useEffect( () => {
        setIsLoading(true)
        loadProducts().then( () => {
            setIsLoading(false)
        });
    },[ dispatch, loadProducts ])

    const selectItemHandler = (id, title) => {
            props.navigation.navigate('ProductDetail',{ productId: id , productTitle: title });
    };  

    if(error) {
        return <View style={styles.centered} >
                <Text>An Error Occurred</Text>
                <Button title="Try Again" onPress={loadProducts} color={Colors.primary} />
            </View>
    }

    if(isLoading) {
        return <View style={styles.centered} >
                <ActivityIndicator size='large' color='gray' />
            </View>
    }

    if(!isLoading && products.length === 0) {
        return <View style={styles.centered} >
            <Text>No Products Detected</Text>
        </View>
    }

    return (
    <FlatList 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products} 
        keyExtractor={item=>item.id} 
        renderItem={itemData=>
            <ProductItem image={itemData.item.imageURL}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}>
                    <Button color={Colors.accent} title="View Details" onPress={()=>{selectItemHandler(itemData.item.id, itemData.item.title)}}/>
                    <Button color={Colors.accent} title="To Cart" onPress={()=>{dispatch(cartActions.addToCart(itemData.item))}} />
            </ProductItem>
    }/>);
};

ProductsOverviewScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerRight:() => <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={()=>{ navData.navigation.navigate('Cart') }} />
            </HeaderButtons>,
        headerLeft:()=> <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={()=>{ navData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
    };
};

const styles = StyleSheet.create({
    centered:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    }
});

export default ProductsOverviewScreen;