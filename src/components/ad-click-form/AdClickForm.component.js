import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './AdClickForm.css'
import MultipleSelect from './MultipleSelect.component';
import { useAdClickData } from '../../context/ad-click/AdClick.context';
import { setSelectedCampaigns, setSelectedDatasources } from '../../context/ad-click/AdClick.actions';
import { removeItemsFromArray, getCampaigns } from '../../helpers/data-analysis';

export default () => {
  const [{ formData, selectedDatasources, selectedCampaigns}, dispatch] = useAdClickData();
  const [datasources, setDatasources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const datasources = Object.keys(formData);
    setDatasources(datasources)
  }, [formData]);

  useEffect(() => {
    (async () => {
      const result = await new Promise((resolve) => {
        resolve(getCampaigns(formData, selectedDatasources));
      })
      setCampaigns(result);
    })();
  }, [selectedDatasources, formData]);

  const handleSelectDatasource = async (newVal) => {
    const result = await new Promise(resolve => {
      const newDatasources = _.xor(selectedDatasources,[newVal])
      if(newDatasources.length < selectedDatasources.length){
        const campaignsToRemove = Object.keys(formData[newVal]);
        dispatch(setSelectedCampaigns(removeItemsFromArray(selectedCampaigns, campaignsToRemove)));
      }
      resolve(newDatasources);
    });
    dispatch(setSelectedDatasources(result));
  };
  const handleSelectedCampaign = async (newVal) => {
    const result = await new Promise(resolve => {
      resolve(_.xor(selectedCampaigns,[newVal]));
    });
    dispatch(setSelectedCampaigns(result));
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
        label={'Campaign'}
      />
    </div>
  );
};
