const initialState = {
  photos: [],
  onLoadPhoto: false
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'GET_CAMERA_PHOTOS': return {
      ... state,
      photos: action.payload
    }

    case 'SET_PHOTOS_LOADING': return {
      ... state,
      onLoadPhoto: action.payload
    }
  
    default: return state
  }
}