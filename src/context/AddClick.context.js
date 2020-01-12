import React, { createContext, useContext, useReducer } from "react"

const initState = {
  data: [
    {
      id: 1,
      date: '01.01.2019',
      datasource: 'Facebook Ads',
      compaign: 'Like Ads',
      clicks: 214,
      impressions: 34111
    },
    {
      id: 2,
      date: '01.01.2019',
      datasource: 'Facebook Ads',
      compaign: 'Offer Campaigns',
      clicks: 214,
      impressions: 34111
    },
    {
      id: 1,
      date: '02.01.2019',
      datasource: 'Google Adwords',
      compaign: 'GDN Prospecting - App - Prio 1 Offer',
      clicks: 214,
      impressions: 34111
    }
  ]
}

const AdClickContext = createContext()

const reducer = (state, action) => state

export const useAdClickData = () => useContext(AdClickContext);

export default ({ children }) => (
  <AdClickContext.Provider value={useReducer(reducer, initState)}>
    {children}
  </AdClickContext.Provider>
);
