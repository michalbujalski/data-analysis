import csv from 'csvtojson';

export const fetchData = async () => {
  const response = await fetch('http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv')
  const data = await response.text();
  const json = await csv().fromString(data);
  console.log(data)
  return new Promise((resolve, reject)=>{
    const data = json.map((item,idx) => {
      return {
        id: idx,
        datasource: item.Datasource,
        date: item.Date,
        campaign: item.Campaign,
        clicks: parseInt(item.Clicks),
        impressions: parseInt(item.Impressions)
    }});

    resolve(data)
  })
};
