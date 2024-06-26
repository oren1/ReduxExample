import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// You can safely import the 'RootState' type from the store file here. 
// It's a circular import, but the TypeScript compiler can correctly handle that for types.
//  This may be needed for use cases like writing selector functions.
import type { RootState } from '../app/store'

// Define a type for the slice state, so the createSlice function can infer the 'state'
// for each case reducer
interface CounterState {
  value: number
  tvshowByChannel: { [key: string]: TVShow[] }
}

interface TVShow {
  name: String,
  director: String
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  tvshowByChannel: {
    '12': [{name:'News', director: 'bla bla'}, {name: 'MKR VIP', director: 'chef'}]
  }
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction<T> type to declare the contents of `action.payload`. 
    // 'T' will be the 'paylod' type
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    multiplyBy: (state, action: PayloadAction<number>) => {
        state.value *= action.payload
    },
    updateTvShows: (state, action: PayloadAction<string>) => {
  
    }
  }
})

// export the actions created in the slice
export const { increment, decrement, multiplyBy, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value
export const getTVShowForChannel = (state: RootState, channel: string) => {
  if (channel in state.counter.tvshowByChannel) {
    return state.counter.tvshowByChannel[channel]
  }
  return null
} 
// export const getLiveTVShows = (state: RootState, channel: string) => state.counter.tvshowByChannel[channel]



export default counterSlice.reducer