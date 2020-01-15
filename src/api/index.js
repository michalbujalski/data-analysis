import csv from 'csvtojson';

const URL = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv'

const parseOptionslNumber = (rawVal) => {
  const value = parseInt(rawVal);
  return !Number.isNaN(value) ? value : 0;
}

export const fetchData = async () => {
  const response = await fetch(URL)
  const data = await response.text();
  const json = await csv().fromString(data);
  return new Promise((resolve)=>{
    const data = json.map((item,idx) => {
      return {
        id: idx,
        datasource: item.Datasource,
        date: item.Date,
        campaign: item.Campaign,
        clicks: parseOptionslNumber(item.Clicks),
        impressions: parseOptionslNumber(item.Impressions)
    }});

    resolve(data)
  })
};
