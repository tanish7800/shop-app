import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  },[dispatch]);

  if(isLoading) {
    return (
      <View style={styles.screen} >
        <ActivityIndicator size="large" color="#ccc"/>
      </View>
    );
  }

  if(orders.length === 0){
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center', height:50}} >
        <Text style={{color:'black', height:22}} >No Orders found!</Text>
        <Text style={{color:'#ccc', height:22}} >Maybe consider adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft:() => (
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
  };
};

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default OrdersScreen;