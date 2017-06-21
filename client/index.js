import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Promise from 'promise-polyfill'; 

// IE 하위 버전 Promise 적용
if (!window.Promise) {
  window.Promise = Promise;
}
 
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);