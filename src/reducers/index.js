import { combineReducers } from 'redux'

import BrandReducer from './brand'
import PhotoReducer from './photo'
import ModelReducer from './model'

export default combineReducers({
  BrandReducer,
  PhotoReducer,
  ModelReducer
})