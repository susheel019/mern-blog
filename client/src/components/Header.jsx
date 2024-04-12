import React, { useEffect, useState } from "react";
import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { TextInput } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/theme/themeSlice";
import userSlice from "../redux/features/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const location = useLocation()
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm , setSearchTerm] = useState('')
  const { theme } = useSelector((state) => state.theme);

  useEffect( ()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTerm = urlParams.get('searchTerm')
    if(searchTerm){
      setSearchTerm(searchTerm)
    }
  } , [location])

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

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm' , searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-blue-700 via-indigo-400 to-purple-700 rounded-lg text-white">
          WriteVerse
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search...."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="black text-sm">@{currentUser.userName}</span>
              <br />
              <span className="black text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/signin"} as={"div"}>
          <Link to="/signin">Sign In</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/signup"} as={"div"}>
          <Link to="/signup">Sign Up</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/project">Project</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
