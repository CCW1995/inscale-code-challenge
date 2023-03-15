import React, { useEffect } from 'react'
import { compose } from 'redux'
import WithPhotoViewer from './action'
import {
  Row, Col,
  Input, FormGroup, Label, Button
} from 'reactstrap'
import Select from 'react-select'
import Map from './Map'

const PhotoViewer = props => {
  useEffect(() => {
    props.getCameraBrand()
  }, [])
  
  return (
    <Row>
      <Col md={ 8 }>
        <FormGroup>
          <Label>Camera Brand</Label>
          <Input
            type={ 'select' }
            onChange={ e => {
              props.onChangePhotoHOC( 'selectedBrand', e.target.value )
              props.onChangePhotoHOC( 'selectedCameraModel', null )
              props.getCameraModel( e.target.value )
            }}
          >
            <option value=""></option>
            {
              props.cameraBrands.map( brandChild => (
                <option key={ brandChild.id } value={ brandChild.id }>
                  { brandChild.name }
                </option>
              ))
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Camera Model</Label>
          <Select
            isMulti
            isDisabled={ !props.selectedBrand }
            options={ props.cameraModels }
            className="basic-multi-select"
            value={ props.selectedCameraModel }
            onChange={ val => {
              props.onChangePhotoHOC( 'selectedCameraModel', val )
            }} 
          />
        </FormGroup>
        <Button 
          color='primary'
          onClick={ () => {
            props.onSearchPhotos()
          }}
        >
          Submit
        </Button>
      </Col>
      <Col md={ 4 }>
        <Map
          googleMapURL={ "https://maps.googleapis.com/maps/api/js?key=AIzaSyA0yrlCvymwJWFJfXSaWY0uDfLwGMbGob0&callback=initMap" }
          photos={ props.photos }
        />
      </Col>
    </Row>
  )
}

export default compose( 
  WithPhotoViewer
)( PhotoViewer )