import React from 'react';
import { View, Text, FlatList, Platform, Button, Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import Colors from '../../constants/colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {

    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);

    const deleteHandler = (id) => {
      Alert.alert('Are you sure ?', 'Do you really want to delete this item ?', [
          {text:'No', style:'default'},
          {text:'Yes',style:'destructive', onPress:() => {
            dispatch(productsActions.deleteProduct(id));
          }}
      ]);
  };

    const editProductHandler = id => {
      props.navigation.navigate('EditProduct', { productId: id });
    };

    if(userProducts.length === 0){
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center', height:50}} >
          <Text style={{color:'black', height:22}} >No Products found!</Text>
          <Text style={{color:'#ccc', height:22}} >Maybe consider adding some!</Text>
        </View>
      );
    }
    
    return <FlatList 
        data={userProducts} 
        keyExtractor={item=>item.id} 
        renderItem={itemData => 
            <ProductItem  
                image={itemData.item.imageURL} 
                title={itemData.item.title} 
                price={itemData.item.price} 
                onSelect = {()=> {
                  editProductHandler(itemData.item.id);
                }}
                >
                  <Button color={Colors.accent} title="Edit" onPress={()=>{
                    editProductHandler(itemData.item.id);
                  }}/>
                  <Button color={Colors.accent} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)} />
                </ProductItem>
            } />
};

UserProductsScreen.navigationOptions = navData  => {
    return {
    headerTitle: 'Your Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              navData.navigation.navigate('EditProduct');
            }}
          />
        </HeaderButtons>
      )
    }
}

export default UserProductsScreen;