import React, { Component } from 'react'
import _ from 'lodash'

const HOC = ( WrappedComponent ) =>{
  class WithHOC extends Component {

    state = {
      selectedPhotoExif: null,
      onLoadExif: false
    }

    getSelectedPhotoExif = id => {
      this.setState({ onLoadExif: true })
      fetch( `https://www.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=11f14d8a96657dd57a48c20c96ea3e8b&photo_id=${ id }&format=json&nojsoncallback=1` )
      .then( response => response.json() )
      .then( val => {
        this.setState({ 
          selectedPhotoExif: val.photo,
          onLoadExif: false
        })
      })
      .catch( err => (
        // console.error( err )
        this.setState({ onLoadExif: false })
      ))
    }

    render = () => {
      return (
        <>
          <WrappedComponent
            { ... this.props }
            selectedPhotoExif={ this.state.selectedPhotoExif }
            onLoadExif={ this.state.onLoadExif }

            getSelectedPhotoExif={ this.getSelectedPhotoExif }
          />
        </>
      )
    }
  }

  return WithHOC
}

export default HOC
