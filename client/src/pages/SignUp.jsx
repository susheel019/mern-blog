import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if(data.success=== false){
        setLoading(false)
        return setErrorMessage(data.message)
      }
     
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  };

  return (
   
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
          {/* left side */}
          <div className="flex-1">
            <Link to="/" className=" font-bold  dark:text-white text-3xl ">
              <span className="px-3 py-2 bg-gradient-to-r from-blue-700 via-indigo-400 to-purple-700 rounded-lg dark:text-white">
                WriteVerse
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">
              You can Sign Up using your username Email and password
            </p>
          </div>
          {/* right side */}

          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="" value="UserName">
                  Username
                </label>
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="userName"
                  onChange={handleChange}
                ></TextInput>
              </div>
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
                  ) : 'Sign Up'
                }
              </Button>
              <OAuth></OAuth>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
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

export default SignUp;