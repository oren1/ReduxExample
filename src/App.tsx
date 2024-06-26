import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getState } from './app/store';
import { useAppSelector, useAppDispatch } from './app/hooks'
import { decrement, increment, multiplyBy, selectCount, getTVShowForChannel } from './Counter/counterSlice'
import { useGetTopListQuery } from './CryptoApi/CryptoApi';

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const state = getState()
  const { data, error, isLoading } = useGetTopListQuery({limit: '10', tsym: 'USD'})

  useEffect(() => {
    console.log('error', error)
    console.log('isLoading', isLoading)
    console.log('data',data)

    let tvShows = getTVShowForChannel(state, '13')
    console.log(`tv shows of channel 13: ${tvShows}`)

  },[data,error,isLoading])

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={() => {dispatch(increment())}}>Increment</button>
      <button onClick={() => {dispatch(decrement())}}>Decrement</button>
      <button onClick={() => {dispatch(multiplyBy(2))}}>Multiply by 2</button>
      <div>{count}</div>
      </header>
    </div>
  );
}

export default App;
