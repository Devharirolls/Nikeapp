import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products';

const initialState = {
  products: products,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
});



// import { createSlice } from "@reduxjs/toolkit";
// import products from '../data/products';

// const initialState = {
//     products:products,
//     selectedProduct:null
// };

// export const productsSlice = createSlice({
//     name:"products",
//     initialState:initialState,
//     reducers: {
//         setSelectedProduct: (state,action)=>{
//             const productId = action.payload;
//             state.selectedProduct = state.products.find((p)=>p.id === productId);
//         },
//     },
// });