import * as types from './AdClick.types'

export const setData = (data) => ({ type: types.SET_DATA, payload: data})

export const setFormData = (data) => ({ type: types.SET_FORM_DATA, payload: data})

export const setSelectedCampaigns = (campaigns) => ({ type: types.SET_SELECTED_CAMPAIGNS, payload: campaigns});

export const setSelectedDatasources = (datasources) => ({ type: types.SET_SELECTED_DATASOURCES, payload: datasources});