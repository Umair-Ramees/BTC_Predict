import React from 'react';

import Home from './component/Home'
import Signin from './component/Signin'
import Signup from './component/Signup'

import { Route, Routes,BrowserRouter,Navigate } from 'react-router-dom'


// const checkAuth = () =>{
// 	const token = sessionStorage.getItem('token');
// 	return !!token
// }

// const AuthRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     checkAuth() ? (
//       <Component {...props}/>
//     ) : (
//       <Navigate to={{ pathname: '/login'}} />
      
//     )
//   )}/>
// )

export default () => (
  
  <BrowserRouter>
  	<Routes>
      <Route exact path="/login" element={(props) => <Signin {...props} />} />
      <Route exact path="/signup" element={(props) => <Signup {...props} />} />
      <Route exact path="/" element= {<Home />} />
    </Routes> 
  </BrowserRouter>
  
)