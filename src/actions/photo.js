import Geocode from "react-geocode";
import _ from 'lodash'
import Moment from 'moment'

Geocode.setApiKey("AIzaSyA0yrlCvymwJWFJfXSaWY0uDfLwGMbGob0");
Geocode.setLanguage("en");

export const getPhotos = urls => dispatch => {
  const promises = urls.map( url => fetch(url) );
  dispatch( setPhotoLoading( true ))

  Promise.all(promises)
  .then( responses => {
    return Promise.all(responses.map(response => response.json()));
  })
  .then( async val => {
    let temp = []

    val.forEach( valChild => {
      temp = [
        ... temp,
        ... valChild.photos.photo
      ]
    })

    Promise.all( temp.map( tempChild => (
      Geocode.fromLatLng( tempChild.latitude, tempChild.longitude )) 
      .then((response) => {
        return response.results[0].formatted_address;
      })
      .catch((error) => {
        console.error(error);
        return '';
      })
    ))
    .then( addresses => {
      const updatedArray = temp.map((tempChild, index) => ( { 
        ... tempChild, 
        datetaken: `${ Moment( tempChild.datetaken ).format( 'DD-MM-YYYY' )}`,
        place: addresses[index] 
      }));
      
      dispatch( setPhotoLoading( false ))
      dispatch( setPhoto( updatedArray ))
    })
  })
  .catch( err => {
    console.error( err )
    dispatch( setPhotoLoading( false ))
  });
}

const setPhotoLoading = payload => ({
  type: 'SET_PHOTOS_LOADING',
  payload
})

export const setPhoto = payload => {
  return ({
    type: 'GET_CAMERA_PHOTOS',
    payload
  })
}