import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import { FixedSizeList as List } from 'react-window';
import './MultipleSelect.css'

export default ({ values, selectedValues, setSelectedValues, label }) => {
  const handleChange = event => {
    setSelectedValues(event.currentTarget.dataset.value);
  };

  const Row = ({index, style}) => {
    const item = values[index];
    return (<MenuItem data-value={item} onClick={handleChange} style={style}>
        <Checkbox checked={selectedValues.indexOf(values[index]) > -1} />
        <ListItemText primary={item} />
      </MenuItem>)
  }
  return (
    <Box>
      <FormControl>
        <InputLabel id="mutiple-chip-label">{label}</InputLabel>
        <Select
          labelId="mutiple-chip-label"
          id="mutiple-chip"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" className="multiple-select__input"/>}
          renderValue={selected => (
            <div className="multiple-select__selections">
              {selectedValues.map(value => (
                <Chip
                  key={value}
                  label={value}
                  className="multiple-select__selection"
                />
              ))}
            </div>
          )}
        >
          <List
            height={400}
            itemCount={values.length}
            itemSize={45}
            width={550}>
            {Row}
          </List>
        </Select>
      </FormControl>
    </Box>
  );
};