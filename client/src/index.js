import React from 'react';
import reactDom from 'react-dom';
import App from './App.js';
import DataProvider from './redux/store';
reactDom.render(
 <DataProvider >
 <App /></DataProvider>   
,document.getElementById('root'));