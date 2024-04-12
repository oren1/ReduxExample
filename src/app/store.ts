import { Middleware, ThunkMiddleware, configureStore } from '@reduxjs/toolkit'
import counterSlice from '../Counter/counterSlice'
import { cryptoTopListApi } from '../CryptoApi/CryptoApi'

const logger: Middleware = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const store = configureStore({
  reducer: {
// Add the generated reducer as a specific top-level slice
    [cryptoTopListApi.reducerPath]: cryptoTopListApi.reducer,
    counter: counterSlice
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(cryptoTopListApi.middleware,logger)
})


export const getState =  (): RootState => store.getState() 

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


