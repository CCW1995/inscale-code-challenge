import React, { useEffect, useRef } from 'react'
import { compose } from 'redux'
import _ from 'lodash'
import WithPhotoViewer from './actions'
import {
  Row, Col,
  FormGroup, Label, Button,
  Card, CardBody, CardHeader
} from 'reactstrap'
import Select from 'react-select'
import ClipLoader from "react-spinners/ClipLoader";
import InfoCard from './InfoCard';

import Map from './Map'
import CustomTable from './Table'

import './index.scss'

const PhotoViewer = props => {
  
  let mapRef = useRef();

  useEffect(() => {
    props.getCameraBrands( `https://www.flickr.com/services/rest/?method=flickr.cameras.getBrands&api_key=11f14d8a96657dd57a48c20c96ea3e8b&format=json&nojsoncallback=1` )
  }, [])

  useEffect(() => {
    if ( !_.isEmpty( props.selectedPhoto )){
      mapRef.current.panTo({ lat: parseFloat( props.selectedPhoto.latitude ), lng:  parseFloat( props.selectedPhoto.longitude ) })
      mapRef.current.setZoom(14)
    }
  }, [ props.selectedPhoto ])

  const onClickMarker = val => props.onChangePhotoHOC( 'selectedPhoto', val )

  const { onLoadBrand, brands } = props.data.BrandReducer 
  
  const { onLoadModel, models } = props.data.ModelReducer
  
  const { onLoadPhoto, photos } = props.data.PhotoReducer

  return (
    <div className='p-4'>
      <Row>
        <Col md={ 8 }>
          <Card>
            <CardHeader>
              Photo Search
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={ 6 }>  
                  <FormGroup>
                    <Label>Camera Brand</Label>
                    {
                      !onLoadBrand && (
                        <Select
                          isMulti
                          options={ brands }
                          value={ props.selectedBrand }
                          onChange={ val => {
                            props.onChangePhotoHOC( 'selectedBrand', val )
                            props.onChangePhotoHOC( 'selectedCameraModel', [] )
                            props.onSearchBrandModel( val )
                          }} 
                        />
                      )
                    }
                    {
                      onLoadBrand && (
                        <div 
                          style={{ 
                            borderRadius: 4, border: 'lightgrey solid 1px', height: 38,
                            display: 'grid', placeContent: 'center'
                          }}
                        >
                          <ClipLoader size={ 20 }/>
                        </div>
                      )
                    }
                  </FormGroup>
                </Col>
                <Col md={ 6 }>
                  <FormGroup>
                    <Label>Camera Model</Label>
                    {
                      !onLoadModel && (
                        <Select
                          isMulti
                          isDisabled={ props.selectedBrand.length < 1 }
                          options={ models }
                          value={ props.selectedCameraModel }
                          onChange={ val => {
                            props.onChangePhotoHOC( 'selectedCameraModel', val )
                          }} 
                        />
                      )
                    }
                    {
                      onLoadModel && (
                        <div 
                          style={{ 
                            borderRadius: 4, border: 'lightgrey solid 1px', height: 38,
                            display: 'grid', placeContent: 'center'
                          }}
                        >
                          <ClipLoader size={ 20 }/>
                        </div>
                      )
                    }
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex">
                <Button 
                  color='warning'
                  style={{ marginLeft: 'auto' }}
                  disabled={ 
                    props.selectedCameraModel.length < 1 ||
                    onLoadPhoto
                  }
                  onClick={ () => {
                    props.onSearchPhotos( props.selectedCameraModel )
                    mapRef.current.setZoom( 1 )
                    mapRef.current.panTo({ lat: -39.145678, lng: -71.711703 })
                  }}
                >
                  Submit
                </Button>
              </div>
            </CardBody>
          </Card>
          {
            photos.length > 0 && (
              <CustomTable
                photos={ photos }
                selectedPhoto={ props.selectedPhoto }
                onClickMarker={ onClickMarker }
              />
            )
          }
        </Col>
        <Col md={ 4 }>
          <div style={{ position: 'sticky', top: 0 }}>
            <Map
              photos={ photos }
              mapRef={ mapRef }
              onLoadPhoto={ onLoadPhoto }
              onClickMarker={ onClickMarker }
            />
            {
              !_.isEmpty( props.selectedPhoto ) && (
                <InfoCard selectedPhoto={ props.selectedPhoto }/>
              )
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default compose( 
  WithPhotoViewer
)( PhotoViewer )