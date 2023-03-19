import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCameraBrands } from '../../../actions/brand'
import { getCameraModels } from '../../../actions/model'
import { getPhotos, setPhoto } from '../../../actions/photo'

const HOC = ( WrappedComponent ) =>{
  class WithHOC extends Component {

    state = {
      onLoadPhoto: false,
      selectedBrand: [],
      selectedCameraModel: [],
      selectedPhoto: null,
      selectedPhotoExif: null,

      onLoadModel: false,
      pageIndex: 1
    }

    onChangePhotoHOC = ( key, val ) => this.setState({ [key]: val })

    onSearchBrandModel = brands => {
      let tempUrls = []
      brands.forEach( brandChild => {
        tempUrls.push( `https://www.flickr.com/services/rest/?method=flickr.cameras.getBrandModels&api_key=11f14d8a96657dd57a48c20c96ea3e8b&brand=${ brandChild.value }&format=json&nojsoncallback=1` )
      });

      this.props.getCameraModels( tempUrls, brands )
    }
    onSearchPhotos = models => {
      let tempUrls = []
      models.forEach( modelChild => {
        tempUrls.push( `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&has_geo=1&content_type=1&api_key=11f14d8a96657dd57a48c20c96ea3e8b&format=json&nojsoncallback=1&privacy_filter=1&camera=${ modelChild.value }&extras=geo,date_taken,owner_name,description,url_m, url_o, url_sq, description, title, tags` )
      });

      this.props.getPhotos( tempUrls )
    }

    getSelectedPhotoExif = id => {
      fetch( `https://www.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=ec150d96bf2b60ce0993df6b476b454b&photo_id=${ id }&format=json&nojsoncallback=1` )
      .then( response => response.json() )
      .then( val => {
        this.setState({ selectedPhotoExif: val.photo })
      })
      .catch( err => (
        console.error( err )
      ))
    }

    render = () => {
      return (
        <>
          <WrappedComponent
            { ... this.props }
            pageIndex={ this.state.pageIndex }
            onLoadPhoto={ this.state.onLoadPhoto }
            onLoadModel={ this.state.onLoadModel } 
            selectedBrand={ this.state.selectedBrand }
            selectedPhotoExif={ this.state.selectedPhotoExif }
            selectedCameraModel={ this.state.selectedCameraModel }
            selectedPhoto={ this.state.selectedPhoto }

            getSelectedPhotoExif={ this.getSelectedPhotoExif }
            onSearchPhotos={ this.onSearchPhotos }
            onSearchBrandModel={ this.onSearchBrandModel }
            onChangePhotoHOC={ this.onChangePhotoHOC }
          />
        </>
      )
    }
  }

  const mapStateToProps = state => ({ data: state })
  return connect ( mapStateToProps, {
    getCameraBrands,
    getCameraModels,
    getPhotos,
    setPhoto
  })( WithHOC )
}

export default HOC
