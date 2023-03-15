export const Get = async (url, response, error, load) => {
  load( true )
  fetch( url ).then( res => {
    return res.json()
  })
  .then( val => {
    response( val )
    load( false )
  })
  .catch( err => {
    load( false )
    error( err )
  })
}