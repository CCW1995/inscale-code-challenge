export const Get = ( urls, response, error, load ) => {
  const promises = urls.map( url => fetch(url) );
  load( true )

  Promise.all(promises)
  .then( responses => {
    return Promise.all(responses.map(response => response.json()));
  })
  .then( val => {
    response( val )
    load( false )
  })
  .catch( err => {
    error( err )
    load( false )
  });
}