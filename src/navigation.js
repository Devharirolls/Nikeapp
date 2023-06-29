import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShoppingCart from './screens/ShoppingCard'
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import TrackOrder from "./screens/TrackOrder";

import { Pressable,Text } from "react-native";
import {FontAwesome5,MaterialCommunityIcons} from "@expo/vector-icons"
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = ()=>{
    const numberofItems = useSelector(selectNumberOfItems);

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle:{backgroundColor:'white'}}}>
                <Stack.Screen 
                name="Products" 
                component={ProductsScreen} 
                options={({navigation})=>({
                    headerRight:()=>(
                        <Pressable onPress={()=>navigation.navigate('Cart')} style={{ flexDirection:'row' }}>
                            <FontAwesome5 name="shopping-cart" size={18} color="grey" />
                            <Text style={{marginLeft:5 ,fontWeight:'500'}}>{numberofItems}</Text>
                        </Pressable>
                    ),
                    headerLeft: () =>(
                        <MaterialCommunityIcons
                         onPress={() => navigation.navigate('Track Order')}
                         name="truck-delivery"
                         size={22}
                         color="gray"
                         />
                    )
                    })} 
                    />
                <Stack.Screen 
                name="Product Details" 
                component={ProductDetailScreen}
                options={{presentation : 'modal'}}
                />
                <Stack.Screen name="Cart" component={ShoppingCart}/>
                <Stack.Screen name="Track Order" component={TrackOrder} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;