import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateListing from './pages/CreateListing';
import ListingDetail from './pages/ListingDetail';
import TripList from './pages/TripList';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/properties/:listingId' element={<ListingDetail/>}/> 
          <Route path='/:userId/trips' element={<TripList/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
