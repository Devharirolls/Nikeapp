import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.1.8:3000/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    // Orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useCreatePaymentIntentMutation
} = apiSlice;


// // import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// // const baseUrl = "http://localhost:3000/"

// // export const apiSlice =createApi({
// //     reducerPath:'api',
// //     baseQuery:fetchBaseQuery({baseUrl}),
// //     endpoints: (builder)=>({
// //         getProducts: builder.query({
// //             query: () =>'products'
// //         }),
// //         getProduct : builder.query({
// //             query:(id) => `products/${id}`
// //         })
// //     }),

// // });

// // export const {useGetProductQuery,useGetProductsQuery} = apiSlice;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = 'http://192.168.1.8:3000';

// // Define a service using a base URL and expected endpoints
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: () => '/products',
//     }),
//     getProduct: builder.query({
//       query: (id) => `products/${id}`,
//     }),
//     //orders
//     createOrder:builder.mutation({
//         query:(newOrder)=>({
//             url:'orders',
//             method:'POST',
//             body: newOrder
//         })
//     }),
//     getOrder:builder.query({
//         query:(ref) => `orders/${ref}`,
//     })
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { 
//     useGetProductsQuery, 
//     useGetProductQuery,
//     useCreateOrderMutation,
//     useGetOrderQuery } = apiSlice;

// // console.log(useGetProductsQuery);