import React from 'react';
import AdClickProvider from './context/AddClick.context';
import AdClickPage from './page/AdClick.page';
import './App.css';

function App() {
  return (
    <AdClickProvider>
      <AdClickPage />
    </AdClickProvider>
  );
}

export default App;
