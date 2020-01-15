import React, { createContext, useContext, useReducer } from 'react';
import reducer from './AdClick.reducer';

const initState = {
  selectedCampaigns: [],
  selectedDatasources: [],
  formData: null
}

const AdClickContext = createContext()

export const useAdClickData = () => useContext(AdClickContext);

export default ({ children }) => {
  return (<AdClickContext.Provider value={useReducer(reducer, initState)}>
    {children}
  </AdClickContext.Provider>)
};
