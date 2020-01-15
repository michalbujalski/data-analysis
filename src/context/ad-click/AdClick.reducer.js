import * as types from './AdClick.types';

export default (state, action) => {
  switch(action.type) {
    case types.SET_SELECTED_CAMPAIGNS: {
      return { ...state, selectedCampaigns: action.payload };
    }
    case types.SET_SELECTED_DATASOURCES: {
      return { ...state, selectedDatasources: action.payload };
    }
    case types.SET_FORM_DATA: {
      return { ...state, formData: action.payload}
    }
    default:{
      throw new Error(`Unknown type ${action.type}`)
    }
  }
}