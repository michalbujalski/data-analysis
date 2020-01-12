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
import './MultipleSelect.css'

export default ({ values, selectedValues, setSelectedValues, label }) => {
  const handleChange = event => {
    setSelectedValues(event.target.value);
  };
  return (
    <Box>
      <FormControl>
        <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
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
          {values.map(value => (
            <MenuItem key={value} value={value} >
              <Checkbox checked={selectedValues.indexOf(value) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};