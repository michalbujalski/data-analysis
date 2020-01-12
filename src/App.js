import React from 'react';
import AdClickProvider from './context/AddClick.context';
import AdClickPage from './page/AddClick.page';
import './App.css';

function App() {
  return (
    <AdClickProvider>
      <AdClickPage />
    </AdClickProvider>
  );
}

export default App;
