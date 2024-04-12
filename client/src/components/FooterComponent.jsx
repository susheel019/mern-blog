import React from 'react'
import {Footer} from 'flowbite-react'
import { Link } from "react-router-dom";
import {BsFacebook , BsInstagram , BsTwitter , BsGithub , BsDiscord} from 'react-icons/bs'


function FooterComponent() {
  return (
    <>
    <Footer className='border border-t-8 border-teal-800'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="ml-4 mt-5">
          <Link to="/" className="self-center whitespace-nowrap text-lg sm:text font-bold  dark:text-white sm:text-3xl ">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-700 via-indigo-400 to-purple-700 rounded-lg text-white">
                WriteVerse
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-8 sm: mt-8 mb-4  sm:gap-6'>
            <div className='ml-4'>
            <Footer.Title title='About'></Footer.Title>
            <Footer.LinkGroup col >
              <Footer.Link
              href='http://www.google.com'
              target='_blank'
              rel='noopener noreferrer'
              >
               Google
              </Footer.Link>
              <Footer.Link
              href='http://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              >
               Facebook
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Follow us'></Footer.Title>
              <Footer.LinkGroup col >
              <Footer.Link
              href='https://github.com/susheel019'
              target='_blank'
              rel='noopener noreferrer'
              >
               Github
              </Footer.Link>
              <Footer.Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              >
                 Discard
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Privacy Policy'></Footer.Title>
              <Footer.LinkGroup col >
              <Footer.Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              >
               Term & Condition
              </Footer.Link>
              <Footer.Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              >
                 Legel
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex  sm:items-center sm:justify-between">
          <Footer.Copyright href='#' by="WhiteVerse Blog" year={new Date().getFullYear()} />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center mb-4">
            <Footer.Icon href="#" icon={BsFacebook}/>
            <Footer.Icon href="#" icon={BsInstagram}/>
            <Footer.Icon href="#" icon={BsTwitter}/>
            <Footer.Icon href="#" icon={BsDiscord}/>
            <Footer.Icon href="https://github.com/susheel019/" icon={BsGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  </>
  )
}

export default FooterComponent