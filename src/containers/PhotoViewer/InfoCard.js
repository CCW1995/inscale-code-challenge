import React, { useEffect, useMemo, useState } from 'react'
import { 
  Card, CardBody, CardHeader,
  Button, Collapse,
  UncontrolledTooltip
} from 'reactstrap'
import { AiFillClockCircle } from 'react-icons/ai'
import { HiCamera, HiLocationMarker, HiUserCircle } from 'react-icons/hi'
import { BsTagsFill } from 'react-icons/bs'
import ClipLoader from "react-spinners/ClipLoader";

import WithExif from './actions/info'

function InfoCard({
  selectedPhoto,
  selectedPhotoExif,
  onLoadExif,
  
  getSelectedPhotoExif
}) {

  const [ expandExif, setExpandExif ] = useState( false )
  const [ expandTags, setExpandTags ] = useState( false )

  const selectedPhotoTags = useMemo(() => {
    if ( selectedPhoto.tags ){
      return selectedPhoto.tags.split( ' ' )
    }

    return []
  }, [ selectedPhoto ])

  useEffect(() => {
    if ( selectedPhoto ){
      getSelectedPhotoExif( selectedPhoto.id )
      setExpandExif( false )
    }
  }, [ selectedPhoto ])

  return (
    <Card className='mt-3 inscale-photo-info_card'>
      {
        onLoadExif && (
          <div 
            className="w-100" 
            style={{ height: 150, display: 'grid', placeContent: 'center' }}
          >
            <ClipLoader/>
          </div>
        )
      }
      {
        !onLoadExif && (
          <>
            <CardHeader className='d-flex align-items-center'>
              <span>
                Photo Info
              </span>
            </CardHeader>
            <CardBody>
              <h5 className='inscale-photo-info_card-title'>
                { selectedPhoto?.title??'-' }
              </h5>
              {
                selectedPhoto?.description?._content && (
                  <span className="inscale-photo-info_card-desc-cont mb-2">
                    { selectedPhoto?.description?._content??'-' }
                  </span>
                )
              }
              <div className='inscale-photo-info_card-text mt-1'>
                <AiFillClockCircle id={ `date_taken` }/>
                <span>{ selectedPhoto?.datetaken??'-' }</span>
                <UncontrolledTooltip target={ `date_taken` }>
                  Date Taken
                </UncontrolledTooltip>
              </div >
              <div className='inscale-photo-info_card-text mt-1'>
                <HiUserCircle id={ `owner_name` }/>
                <span>{ selectedPhoto?.ownername??'-' }</span>
                <UncontrolledTooltip target={ `owner_name` }>
                  Owner Name
                </UncontrolledTooltip>
              </div >
              <div className='inscale-photo-info_card-text mt-1'>
                <HiLocationMarker id={ `photo_location` }/>
                <span>{ selectedPhoto.place }</span>
                <UncontrolledTooltip target={ `photo_location` }>
                  Photo Location
                </UncontrolledTooltip>
              </div >
              {
                selectedPhotoTags.length > 0 && (
                  <div className="mt-1">
                    <div 
                      className='inscale-photo-info_card-text mt-1'
                      style={{ cursor: 'pointer' }}
                      onClick={ () => setExpandTags( prevExpandTags => ( !prevExpandTags ))}
                    >
                      <BsTagsFill/>
                      <span>
                        <strong>{ `${ !expandTags ? 'Show ' : 'Hide ' }` }</strong>
                        { `${ selectedPhotoTags.length } Tags` }
                      </span>
                    </div>
                    <Collapse isOpen={ expandTags }>
                      <div className="mt-2">
                      {
                        selectedPhotoTags.map( tagChild => (
                          <span className="badge bg-warning mt-1" style={{ marginRight: 5 }}> 
                            { tagChild }
                          </span>
                        ))
                      }
                      </div>
                    </Collapse>
                  </div>
                )
              }
              {
                selectedPhotoExif && (
                  <>
                    <div 
                      className="d-flex align-items-center inscale-photo-info_card-text mt-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={ () => setExpandExif( prevExpand => ( !prevExpand ))}
                    >
                      <HiCamera/>
                      <span>
                        { `Click to ` }
                        <strong>{ `${ !expandExif ? 'show' : 'hide' }` }</strong>
                        { ` Exif Info`}
                      </span>
                    </div>
                    <Collapse isOpen={ expandExif }>
                      <ul className='mt-2' style={{ border: '1px solid lightgray', borderRadius: '0.2em' }}>
                        {
                          selectedPhotoExif?.exif.map( exifData => (
                            <li style={{ fontSize: '0.75em' }}>{ `${ exifData.label } - ${ exifData?.raw?._content??'N/A' }` }</li>
                          ))
                        }
                      </ul>
                    </Collapse>
                  </>
                )
              }
            </CardBody>
          </>
        )
      }
    </Card>
  )
}

export default WithExif( InfoCard )