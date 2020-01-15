import _ from 'lodash';

export const getValues = (array, property) => _.uniqBy(array, property).map(item => item[property])
export const getObject = (arr, key) => {
  const keys = getValues(arr, key);
  let obj = {};
  keys.forEach(uniqueKey => {
      obj = {...obj, [uniqueKey]: 
        arr.filter(item => {
        return item[key] === uniqueKey;
      })
    };
  });
  return obj;
};
export const parsePoint = (rawDate, entry) => {
  const impressions = entry.reduce( (prev, current) => prev + current.impressions, 0);
  const clicks = entry.reduce( (prev, current) => prev + current.clicks, 0);
  return { date: rawDate, clicks, impressions};
};

export const parsePoints = (obj, attribute) => {
  return Object.entries(obj).map( ([date, value]) => {
    return parsePoint(date, value, attribute);
  });
};

export const filterData = (selectedDatasources, selectedCampaigns, formData) => {
  const rawEntries = selectedDatasources.map((datasource) => {
    const crossection = _.intersection(selectedCampaigns, Object.keys(formData[datasource]));
    const campaigns = crossection.map((key) => formData[datasource][key]);
    return campaigns;
   });
   return _.flattenDeep(rawEntries);
};

export const removeItemsFromArray = (arrToTransform, itemsToRemove) => {
  return arrToTransform.filter(item => itemsToRemove.indexOf(item) === -1)
};

export const getCampaigns = (form, datasources) => {
  const allCampaigns = datasources.map(datasource => {
    return Object.keys(form[datasource]);
  })
  return _.flatten(allCampaigns);
};

export const parseFormData = (rawData) => {
  return new Promise(resolve =>{
    let obj = {}
    Object.entries(getObject(rawData, 'datasource')).forEach(
      ([key, value]) => {
        obj = {...obj, [key]: getObject(value,'campaign')};
      }
    )
    resolve(obj)
  });
};
