import {BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";

import Mainpage from "./pages/Mainpage.jsx"
import Coding from "./subPages/coding/Coding.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AllRoute from "./AllRoute.jsx"
function App(){
  return (
    <>


      


  <Router>
    <AuthProvider>
 <Routes>

          {/* Public Routes */} 
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
         
          <Route path="/coding" element={<Coding />} />
     
          <Route path="/AllRoute" element={<AllRoute />} />
      
        </Routes>
  
</AuthProvider>
       
 
    </Router>



         
          



               
       


     


      
    </>
  )
}

export default App
