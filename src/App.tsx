import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks'
import { decrement, increment, multiplyBy, selectCount } from './Counter/counterSlice'

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  // const 

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
