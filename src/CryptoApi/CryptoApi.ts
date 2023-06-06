/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type } from 'os'
import { Coin } from './types'

type TopListParams = {
    limit: string, 
    tsym: string
}

// Define a service using a base URL and expected endpoints
export const cryptoTopListApi = createApi({
    reducerPath: 'cryptoTopListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://min-api.cryptocompare.com/data/top/mktcapfull?' }),
    endpoints: (builder) => ({
      getTopList: builder.query<Coin[], TopListParams>({
        query: ({limit, tsym}) => `limit=${limit}&tsym=${tsym}`,
        transformResponse: (response: {Data: any[]}, meta, arg) => {
            let coins = response.Data.map(value => {
                return {
                    fsym: value.CoinInfo.Id as string,
                    tsym: 'USD',
                    price: value.RAW.USD.PRICE as string
                }
            })
            return coins
        } ,
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetTopListQuery } = cryptoTopListApi
