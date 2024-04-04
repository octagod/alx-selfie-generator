import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import fileReducer from './features/files'
import imageReducer from './features/images'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';


const store = configureStore({
  reducer: {
    file: fileReducer,
    image: imageReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: ['file/updatefile'], // ignores the file in redux action
      ignoredPaths: ['file.value'] // ignores the file(non-serialized data) path
    }
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
