// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';
// import Register from './Register';
// import { ToastContainer } from 'react-toastify';
// import Appheader from './Appheader';
// import Customer from './Customer';

// function App() {
//   return (
//     <div className="App">
//       <ToastContainer theme='colored' position='top-center'></ToastContainer>
//       <BrowserRouter>
//       <Appheader></Appheader>
//       <Routes>
//         <Route path='/' element={<Home/>}></Route>
//         <Route path='/login' element={<Login/>}></Route>
//         <Route path='/register' element={<Register/>}></Route>
//         <Route path='/customer' element={<Customer/>}></Route>
//       </Routes>
      
//       </BrowserRouter>
      
//     </div>
//   );
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// // import Home from './Home';
// import LoginPelanggan from './LoginPelanggan'; // Import LoginCustomers.js
// import Login from './Login';
// import Register from './Register';
// import { ToastContainer } from 'react-toastify';
// import Appheader from './Appheader';
// import Customer from './Customer';

// function App() {
//   return (
//     <div className="App">
//       <ToastContainer theme='colored' position='top-center'></ToastContainer>
//       <BrowserRouter>
//         <Appheader></Appheader>
//         <Routes>
//         <Route path='/login' element={<Login />}></Route> {/* Halaman untuk Login.js */}
//           <Route path='/login' element={<LoginPelanggan />}></Route> {/* Gunakan LoginCustomers.js sebagai halaman utama */}
//           <Route path='/admin' element={<Login />}></Route> {/* Jika ingin masuk ke halaman admin */}
//           <Route path='/register' element={<Register />}></Route>
//           <Route path='/customer' element={<Customer />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPelanggan from './LoginPelanggan'; // Import LoginPelanggan.js
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Customer from './Customer';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path='/' element={<LoginPelanggan />}></Route> {/* Halaman utama LoginPelanggan.js */}
          <Route path='/login' element={<LoginPelanggan />}></Route>
          <Route path='/admin' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/customer' element={<Customer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
