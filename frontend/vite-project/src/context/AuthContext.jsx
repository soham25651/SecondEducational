import axios from 'axios';
import httpStatus from 'http-status';
import {  useLocation  , useNavigate} from "react-router-dom";
import server from '../environment';
import { createContext  ,  useState} from "react";
export const AuthContext = createContext({});



const client =axios.create({
      baseURL : `${server}/api/v2/users`

})


export const AuthProvider = ({children}) =>{

const [user , setUser] = useState(null);
const [afterauth , setAfterauth] = useState(null);
const location = useLocation();
  const  navigate= useNavigate();
     
  const handleSignUp = async (username , email , password)=>{
       try {
           let request = await client.post("/signup", {
                username : username , 
                email : email ,
                password : password
           });

           if(request.status === httpStatus.CREATED){
              const userData = request.data;  

                      localStorage.setItem("authData", JSON.stringify({
          token: userData.token,
          accessExpiry: userData.accessExpiry
        }));

                                 localStorage.setItem("user", JSON.stringify(userData)); //localStorage key is "token"    value is "request.data.token"
                                 setUser(userData);
             const redirectPath = location.state?.from || "/mainpage";
            navigate(
               "/Coding" , {replace : true}
            );
            return request.data.message;

           }
           return request.data.message || "Registration failed";
       } catch (error) {
                                 
                         return error.response?.data?.message || "Registration error";
       }
  }

  const handleSignIn = async (username , password , currChapternow)=>{
       console.log(currChapternow); 
   try {
      setAfterauth(currChapternow)
        let request = await client.post("/signin",{
           username : username , 
           password : password
        }
        );

         if (request.status === httpStatus.OK){
                                const userData = request.data;
                                   localStorage.setItem("authData", JSON.stringify({
          token: userData.token,
          accessExpiry: userData.accessExpiry
        }));  
                                 localStorage.setItem("user", JSON.stringify(userData)); //localStorage key is "token"    value is "request.data.token"
                                 setUser(userData);
          
                                 const redirectPath = location.state?.from || "/mainpage";
           console.log(afterauth);
                navigate("/Coding");
                  
                            
                }
     } catch (error) {
        throw error;
     }
  }

   const data = { user, setUser, handleSignUp, handleSignIn , afterauth}


            return (
                <AuthContext.Provider value={data}>
                    {children}
                </AuthContext.Provider>
            )



}