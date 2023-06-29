// @ts-nocheck
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  deliveryFee: 150,
  freeDeliveryFrom: 3000,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        (item) => item.product._id === newProduct._id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product._id === productId
      );
      if (cartItem) {
        cartItem.quantity += amount;
      }

      if (cartItem.quantity <= 0) {
        state.items = state.items.filter((item) => item !== cartItem);
      }
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery
);



// import { createSlice,createSelector } from "@reduxjs/toolkit";

// const initialState = {
//     items : [],
//     deliveryFee:15,
//     freeDeliveryForm:200,
  

// };

// export const cartSlice = createSlice({

//     name:'cart',
//     initialState,

//     reducers: {
//         addCartItem: (state,action) => {
//             const newProduct = action.payload.product;
//             const cartItem = state.items.find(
//                 (item) => item.product._id === newProduct._id
//                 );
//             if (cartItem){
//                 cartItem.quantity += 1;
//             }else {
//                 state.items.push({ product: newProduct, quantity: 1} );
//             }
//         },
//         changeQuantity: (state,action) => {
//             const {productId, amount} = action.payload;
//             const cartItem = state.items.find(item=> item.product._id === productId);

//             if(cartItem){
//                 cartItem.quantity += amount;
//             }

//             if(cartItem.quantity <= 0){
//                 state.items =state.items.filter((item)=>item != cartItem);
//             }
//         },
//         clear:(state) =>{
//             state.items=[];
//         }
//     },
// });


// export const selectNumberOfItems = (state) => state.cart.items.length;

// export const selectSubtotal = (state) =>
//  state.cart.items.reduce(
//     (sum, cartItem)=> sum + cartItem.product.price * cartItem.quantity,
//      0
// );

// const cartSelector =(state) => state.cart;

// export const selectDeliveryPrice = createSelector(
//     cartSelector,
//     selectSubtotal,
//     (cart, subtotal)=> subtotal > cart.freeDeliveryForm ? 0 : cart.deliveryFee
// );

// export const selectTotal = createSelector(
//     selectSubtotal,
//     selectDeliveryPrice,
//     (subtotal ,delivery) => subtotal + delivery
// )
