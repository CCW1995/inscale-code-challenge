import React from 'react'
import _ from 'lodash'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import ClipLoader from "react-spinners/ClipLoader";

const Map = ({
  mapRef,
  photos,
  onLoadPhoto,

  onClickMarker
}) => {
  
  return (
    <>
      <Card>
        <CardHeader>
          Map
        </CardHeader>
        <CardBody>
          <LoadScript
            googleMapsApiKey="AIzaSyA0yrlCvymwJWFJfXSaWY0uDfLwGMbGob0"
          >
            <GoogleMap
              mapContainerClassName="inscale-map-cont"
              center={{ lat: -39.145678, lng: -71.711703 }}
              options={{ fullscreenControl: false }}
              onLoad={ map => mapRef.current = map }
              zoom={ 1 }
            >
              {
                photos.map(( photoChild, photoIndex ) => (
                  <Marker 
                    key={ `photo_${ photoChild.id }_${ photoIndex }` }
                    position={{ lat: parseFloat( photoChild.latitude ), lng: parseFloat( photoChild.longitude )}}
                    icon={ photoChild.url_sq }
                    options={{ streetViewControl: false }}
                    onClick={ () => onClickMarker( photoChild )}
                  />
                ))
              }
            </GoogleMap>
          </LoadScript>
          {
            onLoadPhoto && (
              <div style={{ 
                position: 'absolute', zIndex: 999,
                width: '100%', height: '100%',
                top: 0,
                display: 'grid', placeContent: 'center',
                background: 'rgba(255,255,255,0.4)'
              }}>
                <ClipLoader
                  size={ 70 }
                  color={ 'white' }
                />
              </div>
            )
          }
        </CardBody>
      </Card>
    </>
  )
}

export default Map