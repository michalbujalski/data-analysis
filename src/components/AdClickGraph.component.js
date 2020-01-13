import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter
} from 'victory';

const data2 = [
  { data: 1, y: 3 },
  { x: 2, y: 1 },
  { x: 3, y: 2 },
  { x: 4, y: -2 },
  { x: 5, y: -1 },
  { x: 6, y: 2 },
  { x: 7, y: 3 }
];

const data =[
  { x: new Date('01.01.2019'), y: 12},
  { x: new Date('02.01.2019'), y: 5 },
  { x: new Date('03.01.2019'), y: 5 },
  { x: new Date('02.01.2019'), y: 5 },
  { x: new Date('02.04.2019'), y: 5 },
  { x: new Date('12.12.2019'), y: 5 },
  { x: new Date('02.01.2019'), y: 5 }
  // { data: '03.01.2019', y: 3 },
  // { data: '04.01.2019', y: 0 },
  // { data: '05.01.2019', y: -2 },
  // { data: '06.01.2019', y: -2 },
  // { data: '07.01.2019', y: 5 }
];

const renderLines = (data, color) => (
  <VictoryGroup
    color={color}
    labels={({ datum }) => `date: ${datum.y}`}
    labelComponent={
      <VictoryTooltip
        style={{ fontSize: 10 }}
      />
    }
    data={data}
  >
    <VictoryLine/>
    <VictoryScatter
      size={({ active }) => active ? 8 : 3}
    />
  </VictoryGroup>)

export default () => {
  
  return (
      <VictoryChart
        height={250}
        width={400}
        containerComponent={<VictoryVoronoiContainer/>}
      >
        {renderLines(data)}
       </VictoryChart>
  )
}