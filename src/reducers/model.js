const initialState = {
  models: [],
  onLoadModel: false
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'GET_CAMERA_MODELS': return {
      ... state,
      models: action.payload
    }
 
    case 'SET_MODELS_LOADING': return {
      ... state,
      onLoadModel: action.payload
    }
    
    default: return state
  }
}