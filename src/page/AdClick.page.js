import React, { useEffect, useState } from 'react';
import AdClickForm from '../components/ad-click-form/AdClickForm.component';
import AdClickGraph from '../components/AdClickGraph.component';

import { fetchData } from '../api';
import { useAdClickData } from '../context/ad-click/AdClick.context';
import { setFormData } from '../context/ad-click/AdClick.actions';
import { parseFormData } from '../helpers/data-analysis';

import './AdClick.css';

const renderContent = () => <><AdClickForm /><AdClickGraph /></>

export default () => {
  const [{ formData },dispatch] = useAdClickData();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try{
        const rawDataArr = await fetchData();
        const parsedData = await parseFormData(rawDataArr);
        dispatch(setFormData(parsedData));
      }catch{
        setError("Error fetching or parsing data");
      }finally{
        setIsLoading(false);
      }
    })()
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return <div className="ad-click-page">
    {formData && renderContent()}
  </div>
}