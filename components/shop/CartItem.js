import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    return <View style={styles.cartItem} >
        <Text style={styles.itemData} >
            <Text style={styles.quantity} >{props.quantity} </Text>
            <Text style={styles.mainText} >{props.title}</Text>
        </Text>
        <View style={styles.itemData} >
            <Text style={styles.mainText} >${ Math.round(props.amount.toFixed(2)*100)/100 }</Text>
            { props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton} >
                <Ionicons name={Platform.OS === 'android' ? 'md-trash-bin' : 'ios-trash-bin'} size={23} color='red' />
            </TouchableOpacity>}
        </View>

    </View>
};

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        fontSize:16,
        color:'#888'
    },
    mainText:{
        fontWeight:'bold',
        fontSize:16,
        color:'black'
    },
    deleteButton:{
        marginLeft:20
    }
});

export default CartItem;