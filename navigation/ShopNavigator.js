import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import AuthScreen from '../screens/user/AuthScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import StartupScreen from '../screens/StartupScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/colors';
import EditProductScreen from '../screens/user/EditProductsScreen';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontWeight:'bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };
  
  const ProductsNavigator = createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen,
      ProductDetail: ProductDetailScreen,
      Cart: CartScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
  
  const OrdersNavigator = createStackNavigator(
    {
      Orders: OrdersScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
  
  const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
  
  const ShopNavigator = createDrawerNavigator(
    {
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
  );
  
  const AuthNavigator = createStackNavigator(
    {
      Auth: AuthScreen
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );
  
  const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
  });
  
  export default createAppContainer(MainNavigator);