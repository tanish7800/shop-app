import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import AppLoading from 'expo-app-loading';
// import * as Font from 'expo-font';
import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import NavigationContainer from './navigation/NavigationContainer';
import ordersReducer from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   })
// };

export default function App() {

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if(!fontLoaded){
  //   return <AppLoading startAsync={{fetchFonts}} onFinish={ () => {setFontLoaded(true)} } onError={()=>{}}/>;
  // }

  return (<Provider store={store} >
    <NavigationContainer />
  </Provider>);
}

