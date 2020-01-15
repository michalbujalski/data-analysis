import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useAdClickData } from '../context/ad-click/AdClick.context';
import { filterData, getObject, parsePoints, getCampaigns } from '../helpers/data-analysis';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Legend, YAxis } from 'recharts';

export default () => {
  const [{ formData, selectedDatasources, selectedCampaigns }] = useAdClickData();
  const [data, setData] = useState([]);

  const computedDatasources = useMemo(()=>{
    if(_.isEmpty(selectedDatasources)){
      return Object.keys(formData);
    }
    return selectedDatasources;
  }, [selectedDatasources, formData]);

  const computedCampaigns = useMemo(()=> {
    if(_.isEmpty(selectedCampaigns)){
      return getCampaigns(formData, Object.keys(formData));
    }
    return selectedCampaigns;
  }, [selectedCampaigns, formData])

  const computeData = async (formData, selectedDatasources, selectedCampaigns) => {
    const data= await new Promise(resolve => {
        resolve(parsePoints(getObject(filterData(selectedDatasources, selectedCampaigns, formData),'date' )))
      });
    setData(data);
  }

  useEffect(() => {
    computeData(formData, computedDatasources, computedCampaigns);
  }, [formData, computedDatasources, computedCampaigns]);

  return (
  <LineChart
    width={600}
    height={400}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <Tooltip />
    <CartesianGrid stroke="#f5f5f5" />
    <Line type="monotone" dataKey="clicks" stroke="#ff0000" yAxisId="left" />
    <Line type="monotone" dataKey="impressions" stroke="#0000ff" yAxisId="left" />
    <Legend />
    <XAxis dataKey="date" />
    <YAxis yAxisId="left" orientation="left"/>
  </LineChart>
  )
}