import './App.css'; 
import Home from './screens/Home';
import Login from './screens/Login';
import {Route,Routes} from 'react-router-dom'
import UserSignUp from './screens/UserSignUp';
import { CartProvider } from './store/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<UserSignUp/>}></Route>
          <Route path='/myOrder' element={<MyOrder/>}></Route>
        </Routes>
    </div>
    </CartProvider>
  );
}

export default App;
