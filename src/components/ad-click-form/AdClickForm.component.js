import React, { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import './AdClickForm.css'
import MultipleSelect from './MultipleSelect.component';
import { useAdClickData } from '../../context/ad-click/AdClick.context';

export default () => {
  const [{ formData }] = useAdClickData();
  const [datasources, setDatasources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDatasources, setSelectedDatasources] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);

  useEffect(() => {
    setDatasources(Object.keys(formData));
  }, [formData])

  // const formatDatasources = entry => {

  //   console.log(entry)
  //   return Object.entries(entry).map(([key, value]) => key);
  // }

  useEffect(() => {
    // let campaigns = [];
    // selectedDatasources.forEach(datasource => {
      // console.log(formatDatasources(formData[datasource]));
      // campaigns = _.concat(campaigns, formatDatasources(formData[datasource]));
    // });
    
    setCampaigns(_.flatten(selectedDatasources.map(datasource => formData[datasource])))
  }, [selectedDatasources, formData]);

  const handleSelectDatasource = (newVals) => {
    setSelectedDatasources(newVals);
  };

  return (
    <div className="add-click-form">
      <MultipleSelect
        values={datasources}
        selectedValues={selectedDatasources}
        setSelectedValues={handleSelectDatasource}
        label="Datasource"
      />
      <MultipleSelect
        values={campaigns}
        selectedValues={selectedCampaigns}
        setSelectedValues={setSelectedCampaigns}
        label="Campaigns"
      />
    </div>
  );
};
