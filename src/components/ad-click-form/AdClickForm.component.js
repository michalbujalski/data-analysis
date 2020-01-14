import React, { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import './AdClickForm.css'
import MultipleSelect from './MultipleSelect.component';
import { useAdClickData } from '../../context/ad-click/AdClick.context';
import { setSelectedCampaigns, setSelectedDatasources } from '../../context/ad-click/AdClick.actions';

export default () => {
  const [{ formData, selectedDatasources, selectedCampaigns}, dispatch] = useAdClickData();
  const [datasources, setDatasources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const cachedFormData = useMemo(() => formData, [formData])
  useEffect(() => {
    const datasources = Object.keys(cachedFormData);
    setDatasources(datasources)
  }, [cachedFormData]);

  useEffect(() => {
    (async () => {
      const result = await new Promise((resolve) => {
        const selectedCampaigns = selectedDatasources.map(datasource => {
          return Object.keys(cachedFormData[datasource]);
        })
        resolve(_.flatten(selectedCampaigns));
      })
      setCampaigns(result);
    })();

  }, [selectedDatasources, cachedFormData]);

  const handleSelectDatasource = (newVal) => {
    dispatch(setSelectedDatasources(_.xor(selectedDatasources,[newVal])));
  };
  const handleSelectedCampaign = (newVal) => {
    dispatch(setSelectedCampaigns(_.xor(selectedCampaigns,[newVal])));
  }

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
        setSelectedValues={handleSelectedCampaign}
        label={'datasource'}
      />
    </div>
  );
};
