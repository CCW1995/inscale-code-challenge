import React, { Component } from 'react'
import _ from 'lodash'
import { Get } from '../../utils/fetch'

const HOC = ( WrappedComponent ) =>{
  class WithHOC extends Component {

    state = {
      loading: false,
      photos: [],
      cameraBrands: [],
      cameraModels: [],
      selectedBrand: null,
      selectedCameraModel: []
    }

    onload = val => this.setState({ loading: val })

    onChangePhotoHOC = ( key, val ) => this.setState({ [key]: val })

    getCameraModel = val => {
      Get(
        `https://www.flickr.com/services/rest/?method=flickr.cameras.getBrandModels&api_key=11f14d8a96657dd57a48c20c96ea3e8b&brand=${ val }&format=json&nojsoncallback=1&per_page=20`,
        this.getCameraModelSuccess,
        this.getCameraModelError,
        this.onload
      )
    }
    getCameraModelSuccess = payload => {
      let tempRestructured = _.map( payload.cameras.camera, cameraChild => ({
        label: cameraChild?.name?._content??'-',
        value: cameraChild.id,
      }))

      this.setState({ cameraModels: tempRestructured }) 
    }
    getCameraModelError = err => console.log( err )

    getCameraBrand = () => Get(
      `https://www.flickr.com/services/rest/?method=flickr.cameras.getBrands&api_key=11f14d8a96657dd57a48c20c96ea3e8b&format=json&nojsoncallback=1&per_page=20`,
      this.getCameraBrandSuccess,
      this.getCameraBrandError,
      this.onload
    )
    getCameraBrandSuccess = payload => this.setState({ cameraBrands: payload.brands.brand })
    getCameraBrandError = error => console.log( error )

    onSearchPhotos = () => {
      Get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&has_geo=1&content_type=1&api_key=11f14d8a96657dd57a48c20c96ea3e8b&format=json&nojsoncallback=1&camera=sony/ilce-7m3,sony/alpha-1&extras=description,license,media,machine_tags,owner_name,path_alias,realname,rotation,url_sq,geo,`,
        this.onSearchPhotosSuccess,
        this.onSearchPhotosError,
        this.onload
      )
    }
    onSearchPhotosSuccess = payload => this.setState({ photos: payload.photos.photo })
    onSearchPhotosError = err => console.log( err )

    render = () => {
      return (
        <>
          <WrappedComponent
            { ... this.props }
            onLoadPhoto={ this.state.loading }
            cameraModels={ this.state.cameraModels }
            cameraBrands={ this.state.cameraBrands }
            selectedBrand={ this.state.selectedBrand }
            selectedCameraModel={ this.state.selectedCameraModel }
            photos={ this.state.photos }

            getCameraModel={ this.getCameraModel }
            getCameraBrand={ this.getCameraBrand }
            onChangePhotoHOC={ this.onChangePhotoHOC }
            onSearchPhotos={ this.onSearchPhotos }
          />
        </>
      )
    }
  }

  return WithHOC
}

export default HOC
