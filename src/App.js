import PhotoViewer from './containers/PhotoViewer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/photo' element={ <PhotoViewer/> }/>
        <Route path="*" element={ <PhotoViewer/> }/>
      </Routes>
    </>
  );
}

export default App;
