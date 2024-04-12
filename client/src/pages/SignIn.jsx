import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import {useDispatch ,useSelector} from 'react-redux'
import userSlice from '../redux/features/user/userSlice'
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading , error:errorMessage} = useSelector(state => state.user);

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(userSlice.actions.signInFailed("Please fill out all fields."));
    }
    try {
      // setLoading(true)
      // setErrorMessage(null)

      dispatch(userSlice.actions.signInStart())

      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success=== false){

        // return setErrorMessage(data.message)
        
        dispatch(userSlice.actions.signInFailed(data.message))
      }
      // setLoading(false)

      if(res.ok){
        dispatch(userSlice.actions.signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      // setErrorMessage(error.message)
      // setLoading(false)

      dispatch(userSlice.actions.signInFailed(error.message))
    }
  };

  return (

      <div className=" dark:text-white bg-[rgb(16 , 23 , 42)]  min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
          {/* left side */}
          <div className="flex-1">
            <Link to="/" className=" font-bold  dark:text-white text-3xl ">
              <span className="px-3 py-2 bg-gradient-to-r from-blue-700 via-indigo-400 to-purple-700 rounded-lg text-white">
                WriteVerse
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">
              You can Sign in using your Email and password
            </p>
          </div>
          {/* right side */}

          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* <div>
                <label htmlFor="" value="UserName">
                  Username
                </label>
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="userName"
                  onChange={handleChange}
                ></TextInput>
              </div> */}
              <div>
                <label htmlFor="" value="email">
                  Email
                </label>
                <TextInput
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div>
                <label htmlFor="" value="password">
                  Password
                </label>
                <TextInput
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                ></TextInput>
              </div>
              <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {
                  loading ? (<>
                    <Spinner size='sm'>
                      <span className="pl-3">Loading...</span>
                    </Spinner>
                    </>
                  ) : 'Sign In'
                }
              </Button>
              <OAuth></OAuth>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Dont have an account?</span>
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>

  );
}

export default SignIn;
