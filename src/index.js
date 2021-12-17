import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import App from './App.js';
import reportWebVitals from './reportWebVitals';



////////////Redux ///////////

const CLICK = 'CLICK'

const toggleButton = () => {
  return {
    type: CLICK
  };
}
const colorArray = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'];

const colorReducer = (state = '#E6B3B3', action) => {

  if (action.type === CLICK) {
    console.log('clicked!')
    const idx = Math.floor(Math.random() * colorArray.length - 1)
    console.log('changing color')
    return colorArray[idx];
  }
  else {
    return state;
  }
}

const mapStateToProps = (state) => {
  return { newColor: state }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(toggleButton())
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
const store = createStore(colorReducer);
// render the page
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')

);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
