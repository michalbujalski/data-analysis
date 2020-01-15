import { parsePoint, getValues, getObject, parsePoints, filterData, removeItemsFromArray } from './data-analysis';

it('should parse point', () => {
  const item = parsePoint('2017-01-03', [{impressions: 1, clicks: 2}, {impressions: 3, clicks: 1}, {impressions: 3, clicks: 5}]);
  expect(item.date).toEqual('2017-01-03');
  expect(item.clicks).toEqual(8);
  expect(item.impressions).toEqual(7);
});

it('should retreive unique values for given key', () => {
  const data = [ {a: 3}, {a: 2}, {a: 3}, {a: 3}, {a: 3} ];
  const result = getValues(data,'a');
  expect(result).toHaveLength(2);
  expect(result).toContain(3);
  expect(result).toContain(2);
})

it('should parse object with unique keys and array of values', () => {
  const data = [ {x: '3'}, {x: '4'}, {x: '1'}, {x: '1'}, {x: '4'}, {x: '1'}];
  const result = getObject(data, 'x');
  expect(result['3']).toMatchObject([{x:'3'}]);
  expect(result['1']).toMatchObject([{x:'1'}, {x: '1'}, {x: '1'}]);
  expect(result['4']).toMatchObject([{x:'4'}, {x: '4'}]);
})

it('should convert an array of point to `click` points',  () => {
  const data = {'2017-01-03': [{clicks: 1, impressions: 33}, {clicks: 2, impressions: 22}],'2017-01-04': [{clicks: 11, impressions: 1}, {clicks: 7, impressions: 5}]};
  const result = parsePoints(data, 'clicks');
  expect(result).toHaveLength(2);
  expect(result).toContainEqual({date: '2017-01-03', clicks: 3, impressions: 55});
  expect(result).toContainEqual({date: '2017-01-04', clicks: 18, impressions: 6});
})

it('should return filtered data', () => {
  const selectedDatasources = ['a', 'b'];
  const selectedCampaings = ['x'];
  const data = {a: {x:['1']}, b:{x:['2','3']}, c:{y: ['4','5','6']}};
  const result = filterData(selectedDatasources, selectedCampaings, data);
  expect(result).toHaveLength(3);
})

it('should remove items from original array', () => {
  const data = ['a', 'b'];
  const itemsToRemove = ['a', 'x'];
  const result = removeItemsFromArray(data, itemsToRemove);
  expect(result).toHaveLength(1);
  expect(result).toContain('b');
})