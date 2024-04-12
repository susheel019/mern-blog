import React, { useEffect, useRef, useState } from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button, Alert , Modal} from "flowbite-react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {Link} from 'react-router-dom'
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import userSlice from "../redux/features/user/userSlice";


function DashProfile() {
  const { currentUser , error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess , setUpdateUserSuccess] = useState(null);
  const [updateUserFailed , setUpdateUserFailed] = useState(null);
  const [showModel , setShowModel] = useState(false);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload File must be less than 2mb");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateUserFailed(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserFailed('User data not updated')
      return;
    }
    try {
      dispatch(userSlice.actions.updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(userSlice.actions.updateFailure(data.message));
        setUpdateUserFailed(data.message)
        
      } else {
        dispatch(userSlice.actions.updateSuccess(data));
        setUpdateUserSuccess('Profile updated successfully')
      }
    } catch (error) {
      dispatch(userSlice.actions.updateFailure(data.message));
    }
  }

  async function handleDeleteUser(){
     setShowModel(false)
     try{
      dispatch(userSlice.actions.deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}` , {
        method:'DELETE',  
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(userSlice.actions.deleteUserFailure(data.message))
      }else{
        dispatch(userSlice.actions.deleteUserSuccess(data))
      }
     }catch(error){
      dispatch(userSlice.actions.deleteUserFailure(error.message))
     }
  };
  async function handleSignOut(){
    try{
       const res = await fetch('/api/user/signout' , {
        method:'POST',
       })
       const data = await res.json()
       if(!res.ok){
          console.log(data.message);
       }else{
        dispatch(userSlice.actions.signoutSuccess())
       }
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="pt-8 max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="relative my-3 w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
              
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full objeect-cover border-8 border-[lightgray]"
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure"> {imageFileUploadError} </Alert>
        )}

        <TextInput
          onChange={handleChange}
          className="my-3"
          type="text"
          id="userName"
          placeholder="username"
          defaultValue={currentUser.userName}
        />
        <TextInput
          onChange={handleChange}
          className="my-3"
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          onChange={handleChange}
          className="my-3"
          type="password"
          id="password"
          placeholder="password"
          defaultValue="*******"
        />
        <Button className="my-3" type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/createpost'}>
              <Button color='blue' className="w-full"> 
               Create a post
            </Button>
            </Link>
          )
        }
      </form>
      <div className="text-red-500 flex justify-between">
        <span onClick={()=>setShowModel(true)} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserFailed && (
        <Alert color='failure' className="mt-5">
          {updateUserFailed}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className="mt-5">
          {error}
        </Alert>
      )}
      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account</h3>
            <div className="flex justify-center gap-12" >
              <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color='gray' onClick={()=>setShowModel(false)}>No,cancel</Button>
            </div>
          </div>
        </Modal.Body>
          
      </Modal>
    </div>
  );
}

export default DashProfile;
