import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import './AdClickForm.css'
import MultipleSelect from './MultipleSelect.component';
import { useAdClickData } from '../../context/AddClick.context';

const getValues = (array, property) => _.uniqBy(array, property).map(item => item[property])

export default () => {
  const [{ data }] = useAdClickData();
  const compaigns = useMemo(() => getValues(data, 'compaign'),[ data ])
  const datasource = useMemo(() => getValues(data, 'datasource'),[ data ])
  const [selectedCompaigns, setSelectedCompaigns] = useState([]);
  const [selectedDatasource, setSelectedDatasource] = useState([]);

  return (
    <div className="add-click-form">
      <MultipleSelect
        values={datasource}
        selectedValues={selectedDatasource}
        setSelectedValues={setSelectedDatasource}
        label="Datasource"
      />
      <MultipleSelect
        values={compaigns}
        selectedValues={selectedCompaigns}
        setSelectedValues={setSelectedCompaigns}
        label="Compaigns"
      />
    </div>
  );
};
