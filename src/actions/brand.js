import _ from 'lodash'

export const getCameraBrands = url => dispatch => {
  dispatch( setModelLoading( true ))

  fetch( url )
  .then( response => {
    return response.json()
  })
  .then( val => {
    let temp = _.map( val.brands.brand, brandChild => ({
      label: brandChild?.name??'-',
      value: brandChild.id,
    }))

    dispatch( getCameraBrandsSuccess( temp ))
    dispatch( setModelLoading( false ))
  })
  .catch( err => {
    console.error( err )
    dispatch( setModelLoading( false ))
  });
}

const setModelLoading = payload => ({
  type: 'SET_BRANDS_LOADING',
  payload
})

const getCameraBrandsSuccess = payload => ({
  type: 'GET_CAMERA_BRANDS',
  payload
})