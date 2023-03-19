import React, { useState, useMemo } from 'react'
import _ from 'lodash'
import {
  Card, CardBody, CardHeader,
  UncontrolledTooltip,
  Row, Col, FormGroup, Label, Input,
  Button
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import { AiFillClockCircle } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'

function Table({
  photos,
  selectedPhoto,

  onClickMarker
}) {

  const [ filterByLocation, setFilterLocation ] = useState( '' )
  const [ filterByOwner, setFilterOwner ] = useState( '' )
  const [ filterByDateTaken, setFilterDateTaken ] = useState( null )

  const filteredPhotos = useMemo(() => {
    let temp = photos.filter( tempChild => {
      if ( filterByLocation && tempChild.place.toLowerCase().indexOf( filterByLocation.toLowerCase() ) < 0 ){
        return false
      }
      
      if ( filterByOwner && tempChild.ownername.toLowerCase().indexOf( filterByOwner.toLowerCase() ) < 0 ){
        return false
      }

      if ( filterByDateTaken && Moment( filterByDateTaken ).format( 'DD-MM-YYYY' ) !== tempChild.datetaken ){
        return false
      }

      return true
    })

    return temp
  }, [ photos, filterByLocation, filterByOwner, filterByDateTaken ])

  return (
    <Card className='mt-4'>
      <CardHeader>
        Photos
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={ 4 }>
            <FormGroup>
              <Label>Filter By Location</Label>
              <Input
                value={ filterByLocation }
                onChange={ e => setFilterLocation( e.target.value )}
              />
            </FormGroup>
          </Col>
          <Col lg={ 4 }>
            <FormGroup>
              <Label>Filter By Owner Name</Label>
              <Input
                value={ filterByOwner }
                onChange={ e => setFilterOwner( e.target.value )}
              />
            </FormGroup>
          </Col>
          <Col lg={ 4 }>
            <FormGroup>
              <Label>Filter By Date Taken</Label>
              <DatePicker
                selected={ filterByDateTaken }
                dateFormat={ 'dd-MM-yyyy' }
                onChange={ val => setFilterDateTaken( val )} 
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex">
          <Button
            color={ 'danger' }
            className={ 'ml-2' }
            onClick={ () => {
              setFilterDateTaken( null )
              setFilterOwner( '' )
              setFilterLocation( '' )
            }}
          >
            Reset
          </Button>
        </div>
        <div className='inscale-photo-cont mt-4'>
          {
            filteredPhotos.map(( photoChild, photoIndex ) => (
              <div 
                key={ `${ photoChild.id }-${ photoIndex }` } 
                className={ `inscale-photo-cont_card ${ selectedPhoto?.id === photoChild.id ? 'bg-warning': '' }` }
                onClick={ () => onClickMarker( photoChild )}
              >
                <img className='inscale-photo-cont_card-img' src={ photoChild.url_m }/>
                <h5 className='inscale-photo-cont_card-title' id={ `date_owner_${ photoChild.id }`}>
                  <UncontrolledTooltip target={ `date_owner_${ photoChild.id }` }>
                    { `Owner Name - ${ photoChild.ownername }`}
                  </UncontrolledTooltip>
                  { photoChild.ownername }
                </h5>
                <div className='inscale-photo-cont_card-date mb-1' id={ `date_taken_${ photoChild.id }` }>
                  <AiFillClockCircle/>
                  <UncontrolledTooltip target={ `date_taken_${ photoChild.id }` }>
                    Date Taken
                  </UncontrolledTooltip>
                  <span>{ photoChild.datetaken }</span>
                </div>
                <div className="inscale-photo-cont_card-location" id={ `date_location_${ photoChild.id }` }>
                  <HiLocationMarker/>
                  <UncontrolledTooltip target={ `date_location_${ photoChild.id }` }>
                    { `Location - ${ photoChild.place }` }
                  </UncontrolledTooltip>
                  <span>
                    { photoChild.place }
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default Table