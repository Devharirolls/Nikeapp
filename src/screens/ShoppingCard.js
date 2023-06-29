
import React from "react";
import { Text,View,StyleSheet,FlatList,Pressable, ActivityIndicator, Alert} from "react-native";
import cart from "../data/cart";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import { selectDeliveryPrice, selectSubtotal, selectTotal,cartSlice } from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCartTotals=()=> {
    const subtotal =useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector (selectTotal);
    const dispatch = useDispatch();

    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>subTotal</Text>
                <Text style={styles.text}>&#8377; {subtotal}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>&#8377; {deliveryFee}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>&#8377;{total}</Text>
            </View>
        </View>
    );
}

const ShoppingCart = ()=>{
    const subtotal =useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector (selectTotal);
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const [createOrder,{data,error,isLoading}] = useCreateOrderMutation();

    console.log(error,isLoading);

    const onCreateOrder = async ()=>{
       const result = await createOrder({
            items:cartItems,
            subtotal,
            deliveryFee,
            total,
            customer:{
                name:"hari",
                address:'Myhome',
                email:"harnharisiva181@gmail.com"
            }
        });

        Alert.alert('order Has been Submitted',
        `Your Order Reference is : ${result.data.data.ref}`
        );
        dispatch(cartSlice.actions.clear());

        if(result.data?.status === 'ok'){
            Alert.alert(
                'order Has been Submitted',
                `Your Order Reference is : ${result.data.data.ref}`
            );
            dispatch(cartSlice.actions.clear());
        }
    };

    return(
       <>
        <FlatList
        data={cartItems}
        renderItem={({item})=><CartListItem cartItem={item}/>}
        ListFooterComponent={ShoppingCartTotals}
        />
        <Pressable onPress={onCreateOrder} style={styles.button}>
                <Text style={styles.buttonText}>
                    Checkout
                    {isLoading && <ActivityIndicator/>}
                    </Text>
            </Pressable>
       </>
    );
}

const styles= StyleSheet.create({
    totalsContainer:{
        borderColor:'gainsboro',
        borderTopWidth:1,
        margin:20,
        paddingTop:10
       },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:2
    },
    text:{
        fontSize:16,
        color:'grey',
    },
    textBold:{
        fontSize:16,
        fontWeight:'500'
    },
    button:{
        position:'absolute',
        backgroundColor:'black',
        bottom:30,
        width:'90%',
        alignSelf:'center',
        padding:20,
        borderRadius:100,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize:16,
    },
});

export default ShoppingCart;
