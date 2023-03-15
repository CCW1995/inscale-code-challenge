import React, { useRef } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import './index.css'

const Map = (props) => {

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA0yrlCvymwJWFJfXSaWY0uDfLwGMbGob0"
    >
      <GoogleMap
        mapContainerClassName="map-container"
        center={{ lat: -39.145678, lng: -71.711703 }}
        onLoad={ map => console.log( map )}
        zoom={2}
      >
        {
          props.photos.map( photoChild => (
            <>
              <Marker 
                position={{ lat: +photoChild.latitude, lng: +photoChild.longitude }}
                icon={ photoChild.url_sq }
                // onClick={ () => {
                //   map.panTo({ lat: +photoChild.latitude, lng: +photoChild.longitude })
                // }}
              />
            </>
          ))
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default Map