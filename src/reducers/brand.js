const initialState = {
  brands: [],
  onLoadBrand: false
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'GET_CAMERA_BRANDS': return {
      ... state,
      brands: action.payload
    }

    case 'SET_BRANDS_LOADING': return {
      ... state,
      onLoadBrand: action.payload
    }
  
    default: return state
  }
}