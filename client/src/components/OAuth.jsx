import React from 'react'
import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider , signInWithPopup , getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userSlice from '../redux/features/user/userSlice'

function OAuth() {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app)
    const handleGoogleClick = async ()=>{
       const provider = new GoogleAuthProvider();
       provider.setCustomParameters({prompt: 'select_account' })
       try{
         const resultFromGoogle = await signInWithPopup(auth , provider)
         console.log(resultFromGoogle);
         console.log(resultFromGoogle.user.email);
         console.log(resultFromGoogle.user.photoURL);
         const res = await fetch('api/auth/google' , {
          method : 'POST',
          headers:{ 'Content-Type' : 'application/json'},
          body : JSON.stringify({
            name:resultFromGoogle.user.displayName,
            email:resultFromGoogle.user.email,
            profilePicture:resultFromGoogle.user.photoURL
          })

         })
         const data = await res.json()
         if(res.ok){
           const data1 =  dispatch(userSlice.actions.signInSuccess(data))
          //  console.log(data1);
             navigate('/')
         }

       }catch(error){
        console.log(error);
       }
    }
  return (
    <>
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
    <AiFillGoogleCircle className='w-6 h-6 mr-2' />
    Continue with Google
    </Button>
    </>
  )
}
export default OAuth