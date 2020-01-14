import React, { useEffect } from 'react';
import _ from 'lodash';
import AdClickForm from '../components/ad-click-form/AdClickForm.component';
import AdClickGraph from '../components/AdClickGraph.component';

import './AdClick.css';
import { fetchData } from '../api';
import { useAdClickData } from '../context/ad-click/AdClick.context';
import { setData, setFormData } from '../context/ad-click/AdClick.actions';

const getValues = (array, property) => _.uniqBy(array, property).map(item => item[property])
const getObject = (arr, key) => {
  const keys = getValues(arr, key);
  let obj = {};
  keys.forEach(uniqueKey => {
      obj = {...obj, [uniqueKey]: 
        arr.filter(item => {
        return item[key] === uniqueKey
      })
    };
  });
  return obj;
};

export default () => {
  const [{ data }, dispatch] = useAdClickData();
  useEffect(() => {
    (async () => {
      const parsedData = await fetchData();
      let obj = {}
      Object.entries(getObject(parsedData, 'datasource')).forEach(
        ([key, value]) => {
          obj = {...obj, [key]: getObject(value,'campaign')};
        }
      )
      dispatch(setFormData(obj));
      dispatch(setData(parsedData))
    })()
  }, []);
  return <div className="ad-click-page">
    <AdClickForm />
    {/* <AdClickGraph /> */}
    </div>
}