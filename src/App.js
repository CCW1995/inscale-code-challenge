import PhotoViewer from './containers/PhotoViewer'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import configureStore from './store'

const store = configureStore();

function App() {
  return (
    <Provider store={ store }>
      <Routes>
        <Route path="*" element={ <PhotoViewer/> }/>
      </Routes>
    </Provider>
  );
}

export default App;
