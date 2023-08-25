import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './components/NavBar/Nav'
import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import PrivateComponent from './components/PrivateComponent';
import LogIn from './components/LogIn/LogIn'
import AddProduct from './components/AddProduct/AddProduct';
import ProductList from './components/ProductList/ProductList';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:id' element={<UpdateProduct />} />
        <Route path='/logout' element={<h1>Logout Component</h1>} />
        <Route path='/profile' element={<h1>Profile Section component</h1>} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

      </Routes>
      </BrowserRouter>
      {/* <h1>E-Dashboard</h1> */}
      <Footer />
    </div>
  );
}

export default App;
