import { createContext, useState } from "react";
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { useNotifications } from 'reapop';
import { useNavigate } from "react-router-dom";

 


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
 const [credit,setCredit]  =useState(false)
 const [image,setImage] = useState(false)
const[resultImage,setResultImage] = useState(false)

const backendUrl = import.meta.env.VITE_BACKEND_URL 
const navigate = useNavigate()
const {getToken} = useAuth()
const {isSignedIn} = useUser()
const {openSingIn} = useUser()
const { notify } = useNotifications()

 const loadCreditData = async()=>{
  try {
    const token =  await getToken()
   
    const {data} = await axios.get(backendUrl+'/api/user/credits',{headers:{token}})


    if(data.success){
      setCredit(data.credits)
      console.log(data.credits)
    }



  } catch (error) {
    console.log(error.response?.data || error.message)
    notify({
      title: 'Error',
      message: error.response?.data?.message || error.message,
      status: 'error',
      dismissible: true,
      dismissAfter: 5000,
    })
  }



 }
 

 const removeBg = async(image)=>{
 
  try {
    if(!isSignedIn){
        return openSingIn()
    }
    setImage(image)
    setResultImage(false)
    navigate('/result')
    const token = await getToken()
    const formData = new FormData()
    image && formData.append('image',image)
    const {data} = await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:{token}})
    if(data.success){
      setResultImage(data.resultImage)
      data.creditBalance && setCredit(data.creditBalance)
    }else{
      notify({
        title: 'Error',
        message: data.message,
        status: 'error',
        dismissible: true,
        dismissAfter: 5000,
      })
      data.creditBalance && setCredit(data.creditBalance)
      if(data.creditBalance===0){
        navigate('/buy')
      }
    }

    
  } catch (error) {
    console.log(error.response?.data || error.message)
    notify({
      title: 'Error',
      message: error.response?.data?.message || error.message,
      status: 'error',
      dismissible: true,
      dismissAfter: 5000,
    })
  }
 }




  const value = {
    credit,setCredit,loadCreditData,backendUrl,
    image,setImage,
    removeBg,
    resultImage,setResultImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
