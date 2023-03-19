export const getCameraModels = ( urls, brands ) => dispatch => {
  const promises = urls.map( url => fetch(url) );
  dispatch( setModelLoading( true ))

  Promise.all(promises)
  .then( responses => {
    return Promise.all(responses.map(response => response.json()));
  })
  .then( val => {
    let temp = []

    val.forEach(( valChild, valIndex ) => {
      valChild.cameras.camera.forEach( cameraChild => {
        temp.push({
          ... cameraChild,
          label: cameraChild?.name?._content??'-',
          value: `${ brands[ valIndex ].value }/${ cameraChild.id }`,
        })
      });
    })
    
    dispatch( getCameraModelsSuccess( temp ))
    dispatch( setModelLoading( false ))
  })
  .catch( err => {
    dispatch( setModelLoading( false ))
  });
}

const setModelLoading = payload => ({
  type: 'SET_MODELS_LOADING',
  payload
})

const getCameraModelsSuccess = payload => ({
  type: 'GET_CAMERA_MODELS',
  payload
})