import React, { useEffect } from 'react';
import _ from 'lodash';
import AdClickForm from '../components/ad-click-form/AdClickForm.component';
import AdClickGraph from '../components/AdClickGraph.component';

import './AdClick.css';
import { fetchData } from '../api';
import { useAdClickData } from '../context/ad-click/AdClick.context';
import { setData, setFormData } from '../context/ad-click/AdClick.actions';

const getValues = (array, property) => _.uniqBy(array, property).map(item => item[property])

export default () => {
  const [{ data }, dispatch] = useAdClickData();
  useEffect(() => {
    (async () => {
      const parsedData = await fetchData();
      const datasources = getValues(parsedData, 'datasource');
      let formData = {};
      datasources.forEach(datasource => {
        // const entry = {};
        const datasources = getValues(parsedData.filter(item => item.datasource === datasource),'campaign');
        // datasources.map(datasource => {
        //   const arr = _.flatten(datasource.split('-').map(item => item.split('|'))).map(item=>_.trim(item));
        //   const key = arr.pop();
        //   if(entry.hasOwnProperty(key)){
        //     entry[key] = _.concat(entry[key], arr );
        //   } else {
        //     entry[key] = arr;
        //   }
        // });

        // console.log(_.uniq(Object.keys(entry).m));
        // console.log(entry)
        formData = { ...formData, [datasource]: datasources}
      });
      dispatch(setData(parsedData));
      dispatch(setFormData(formData));
    })()
  }, []);
  return <div className="ad-click-page">
    <AdClickForm />
    {/* <AdClickGraph /> */}
    </div>
}